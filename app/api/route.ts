import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route for chat using Supabase to persist chat history
 * and OpenAI to generate assistant responses, with optional RAG from PDF data.
 *
 * Notes:
 * - Integrates retrieval-augmented generation using embeddings and similarity search.
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
const EMBEDDING_MODEL = "text-embedding-ada-002";

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

/* Embedding and similarity helpers */
function calculateDotProductSimilarity(vector1: number[], vector2: number[]): number {
  if (vector1.length !== vector2.length) {
    throw new Error('Vector dimensions do not match');
  }

  let dotProduct = 0;
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
  }

  return dotProduct;
}

async function calculateSimilarityScores(userQueryEmbedding: number[], pdfData: any[]) {
  const similarityScores: { pageData: any; similarity: number; }[] = [];

  pdfData.forEach((row: { vector_data: number[]; page_text: string }) => {
    const pageEmbedding = row.vector_data;
    const similarity = calculateDotProductSimilarity(userQueryEmbedding, pageEmbedding);

    similarityScores.push({
      pageData: row,
      similarity: similarity,
    });
  });

  // Sort by similarity in descending order
  similarityScores.sort((a, b) => b.similarity - a.similarity);

  // Select the top 5 pages
  const top5SimilarPages = similarityScores.slice(0, 5);

  if (top5SimilarPages.length > 0) {
    const mostSimilar = top5SimilarPages[0].pageData.page_text;
    const plainText = mostSimilar.replace(/[+\n]/g, '');
    return plainText;
  }
  return "";
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

    // Optional: Retrieve relevant PDF data for RAG
    let contextText = "";
    const nameOfFile = body?.fileName; // Assuming fileName is passed in body
    if (nameOfFile) {
      const { data: pdfData } = await supabase
        .from('pdfs')
        .select('*')
        .eq('pdf_name', nameOfFile)
        .eq('user_id', userId);

      if (pdfData && pdfData.length > 0) {
        const queryEmbedding = await openai.embeddings.create({
          model: EMBEDDING_MODEL,
          input: query,
        });
        const xq = queryEmbedding.data[0].embedding;
        contextText = await calculateSimilarityScores(xq, pdfData);
      }
    }

    // Prepare messages with context if available
    const systemMessage: ChatMessage = contextText
      ? { role: "system", content: `Using this info: ${contextText} make the answer as explanatory as possible. With points and examples.` }
      : { role: "system", content: "You are a helpful assistant." };
    const fullMessages = [systemMessage, ...messages];

    // Call OpenAI Chat Completion
    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: fullMessages.map((m) => ({ role: m.role, content: m.content })),
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