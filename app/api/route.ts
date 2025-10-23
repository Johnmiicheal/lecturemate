import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

/**
 * Cleaned up API route for chat using Supabase to persist chat history
 * and OpenAI to generate assistant responses.
 *
 * Notes:
 * - This version removes commented / dead code, flattens nested functions,
 *   and centralizes Supabase operations with clearer control flow.
 * - Replace the placeholder userId with real user identification (session / token).
 * - Adjust OpenAI usage to match your installed SDK version if necessary.
 */

/* Config & clients */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in environment");
}
if (!SUPA_URL || !SUPA_KEY) {
  console.error("Missing Supabase environment variables");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY || "" });
const supabase = createClient(SUPA_URL || "", SUPA_KEY || "");

const CHAT_MODEL = "gpt-3.5-turbo";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
type ChatRow = { user_id: string; chats: ChatMessage[] };

/* Helper utilities */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getChatRow(userId: string): Promise<ChatRow | null> {
  const { data, error } = await supabase
    .from("chats")
    .select("user_id,chats")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase select error:", error);
    throw error;
  }
  return data as ChatRow | null;
}

async function createChatRow(userId: string, firstMessage: ChatMessage) {
  const { data, error } = await supabase
    .from("chats")
    .insert([{ user_id: userId, chats: [firstMessage] }])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
  return data;
}

async function updateChatRow(userId: string, chats: ChatMessage[]) {
  const { data, error } = await supabase
    .from("chats")
    .update({ chats })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    throw error;
  }
  return data;
}

/* Remove last message (used for rollback on failure) */
async function removeLastMessageIfOdd(userId: string) {
  const row = await getChatRow(userId);
  if (!row) return;
  const chats = Array.isArray(row.chats) ? [...row.chats] : [];
  if (chats.length === 0) return;
  // If number of messages is odd (user asked but assistant didn't reply),
  // remove the last user message.
  if (chats.length % 2 !== 0) {
    chats.pop();
    await updateChatRow(userId, chats);
  }
}

/* Main handler */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const query: string = (body?.query || "").toString().trim();

    // NOTE: Replace this with actual authenticated user identification
    const userId = (body?.userId || "1111").toString();

    if (!OPENAI_API_KEY) {
      return new NextResponse(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!query) {
      return new NextResponse(
        JSON.stringify({ error: "Please provide a non-empty query" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Ensure chat row exists and append user's message
    const userMessage: ChatMessage = { role: "user", content: query };
    const existingRow = await getChatRow(userId);

    if (!existingRow) {
      await createChatRow(userId, userMessage);
    } else {
      const updatedChats = [...existingRow.chats, userMessage];
      await updateChatRow(userId, updatedChats);
    }

    // Small delay to avoid eventual-consistency surprises with Supabase (if needed)
    await sleep(500);

    // Read the latest chat history
    const chatRow = await getChatRow(userId);
    const messages: ChatMessage[] = chatRow?.chats ?? [userMessage];

    // Call OpenAI Chat Completion
    // Note: This call shape matches openai.chat.completions.create used previously.
    // If you use a different version of the OpenAI SDK, adapt the call accordingly.
    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const assistantContent =
      completion?.choices?.[0]?.message?.content?.toString() ?? "";

    // Append assistant response to DB
    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: assistantContent,
    };

    const finalRow = await getChatRow(userId);
    const finalChats = finalRow ? [...finalRow.chats, assistantMessage] : [userMessage, assistantMessage];
    await updateChatRow(userId, finalChats);

    const result = {
      query,
      completion: assistantContent,
      chats: finalChats,
    };

    return new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("API error:", err);

    // Attempt to rollback last user message if assistant failed to respond
    try {
      const body = await request.json().catch(() => ({}));
      const userId = (body?.userId || "1111").toString();
      await removeLastMessageIfOdd(userId);
    } catch (rollbackErr) {
      console.error("Rollback error:", rollbackErr);
    }

    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
