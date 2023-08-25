import { Configuration, OpenAIApi } from "openai";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PineconeClient } from "@pinecone-database/pinecone";
import { setCookie } from "../../utils/cookies";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server"
// import type { NextApiRequest, NextApiResponse } from 'next'

// Initialize Openai

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// if (!configuration.apiKey) {
//   const err = () => {
//     return console.log("Error");
//   }
//   err()
// } else {
//   console.log("It's working");
// }

// Declare constants
const COMPLETIONS_MODEL = "text-davinci-003";
const EMBEDDING_MODEL = "text-embedding-ada-002";
// api(req: any, res: any)

export async function POST(request: Request) {
  const json = await request.json()
  
  console.log("first json: " + JSON.stringify(json))
  const supabase = createServerComponentClient({cookies})
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("api: " + JSON.stringify(user))
  const userId = user?.id


  console.log(`lecture-mate-${userId}`);

  if (!configuration.apiKey) {
    return new NextResponse("OpenAI API key not properly configured", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })    
  }

  const query = json.query || "";

  if (query.trim().length === 0) {
    return new NextResponse("Please enter a question", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }) 
  }

  // Initialize pinecone
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: "us-central1-gcp",
    apiKey: process.env.PINECONE_KEY!,
  });
  console.log('pinecone point:', query)

  const queryEmbedding = await openai.createEmbedding({
    model: EMBEDDING_MODEL,
    input: query,
  });
  console.log("openai point:", query);

  const xq = queryEmbedding.data.data[0].embedding;

  const queryIndex = pinecone.Index("lecture-mate");

  const queryRes = await queryIndex.query({
    queryRequest: {
      namespace: `lecture-mate-${userId}`,
      vector: xq,
      topK: 1,
      includeMetadata: true,
    },
  });
  let info = "";
if (queryRes && queryRes.matches && queryRes.matches.length > 0) {
  const firstMatch = queryRes.matches[0] as any;
  if (firstMatch.metadata && typeof firstMatch.metadata.text === "string") {
    info = firstMatch.metadata.text;
  }
}
console.log("Query Info:", info);
  const finalPrompt = `
      Info: ${info}
      Question: ${query}.
      Answer:
    `;
  try {
    const model = new OpenAI({});
    const memory = new BufferMemory();
    // const response = await openai.createCompletion({
    //   model: COMPLETIONS_MODEL,
    //   prompt: finalPrompt,
    //   max_tokens: 2048,
    // });

    const chain = new ConversationChain({ llm: model, memory: memory });
    const completion = await chain.call({ input: finalPrompt });

    // const completion: string | undefined = response.data.choices[0].text;
    console.log(completion);
    console.log(query);

    const result = {
      query: query,
      completion: completion
    }
    
    return (new NextResponse(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
    )
    // res.status(200).send({ query, result: completion });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return new NextResponse(error.response.data, {
        status: error.response.status,
        headers: { "Content-Type": "application/json" },
      })
      // res.status().json();
    } else {
      console.error(`Error with request: ${error.message}`);

      return new NextResponse("An error occurred during your request.", {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
      
      // res.status(500).json({
      //   error: {
      //     message: "An error occurred during your request.",
      //   },
      // });
    }
  }

}
