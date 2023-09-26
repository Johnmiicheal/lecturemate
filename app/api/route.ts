import { Configuration, OpenAIApi } from "openai";
import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PineconeClient } from "@pinecone-database/pinecone";
import { setCookie } from "../../utils/cookies";
import { createClient } from "@supabase/supabase-js";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server"
import { Interface } from "readline";
// import type { NextApiRequest, NextApiResponse } from 'next'

// Initialize Openai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

if (!configuration.apiKey) {
  console.log("Error");
  // return;
} else {
  console.log("It's working");
}

// Declare constants
const COMPLETIONS_MODEL = "text-davinci-003";
const EMBEDDING_MODEL = "text-embedding-ada-002";
const supabase = createClient('https://mgolchoghrkotexoxizm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nb2xjaG9naHJrb3RleG94aXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5MjE3ODgsImV4cCI6MjAwODQ5Nzc4OH0.cHDO7n3MujZrI9pn40oq-DIFXWs9zBmwjrEb0ZhVixg');

export async function POST(request: Request) {
  const json = await request.json()
  const nameOfFile = json.nameOfFile
  console.log("This is the json: " + nameOfFile)
  
  const { data: pdfData } = await supabase.from('book_pages').select('*').eq('book_name', nameOfFile);

  console.log("extracted "+ JSON.stringify(pdfData)) 

  if(pdfData !== null){
    console.log("length of file: "+ pdfData.length)
  }


  if (!configuration.apiKey) {
    return (new NextResponse("OpenAI API key not properly configured", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }))  
  }

  const query = json.query || "";

  if (query.trim().length === 0) {
    return (new NextResponse("Please enter a question", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })) 
  }

  const queryEmbedding = await openai.createEmbedding({
    model: EMBEDDING_MODEL,
    input: query,
  });
  console.log("openai point:", query);

  const xq = queryEmbedding.data.data[0].embedding;

  console.log("embedding: "+ xq)  

  function calculateDotProductSimilarity(vector1: number[], vector2: number[] | any): number {
      if (vector1.length !== vector2.length) {
        throw new Error('Vector dimensions do not match');
      }
    
      let dotProduct = 0;
      for (let i = 0; i < vector1.length; i++) {
        dotProduct += vector1[i] * vector2[i];
      }
    
      console.log("It's me Ifiok2")

      return dotProduct;
    }

    
  
    async function calculateSimilarityScores(userQueryEmbedding: number[], pdfData: any[] | any) {
      const similarityScores: { pageData: any; similarity: number; }[] = [];
    
      pdfData.forEach((row: { page_embedding: any[]; }) => {
        const pageEmbedding = row.page_embedding;
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
      console.log(top5SimilarPages)

      //To get the results
    
      const mostSimilar = top5SimilarPages[0].pageData.page_text
      const inputText = mostSimilar

      const plainText = inputText.replace(/[+\n]/g, '');

      console.log(plainText);


      // let info = "";
  
      console.log("Query Info:", plainText);
      const finalPrompt = `
          Info: Using this info: ${plainText} make the answer as explanatory as possible. With points and examples
          Question: ${query}.
          Answer:
        `;
      try {
        // const model = new OpenAI({});
        // const memory = new BufferMemory();
        const response = await openai.createCompletion({
          model: COMPLETIONS_MODEL,
          prompt: finalPrompt,
          max_tokens: 2048,
        });
    
        // const chain = new ConversationChain({ llm: model, memory: memory });
        // const completion = await chain.call({ input: finalPrompt });
    
        const completion: string | undefined = response.data.choices[0].text;
        console.log(completion);
        console.log(query);
    
        const result = {
          query: query,
          completion: completion
        }

        console.log("Funny how this will work: " + result)
        
        return result
      } catch (error: any) {
        if (error.response) {
          console.error(error.response.status, error.response.data);
          return (new NextResponse(error.response.data, {
            status: error.response.status,
            headers: { "Content-Type": "application/json" },
          }))
          // res.status().json();
        } else {
          console.error(`Error with request: ${error.message}`);
    
          return (new NextResponse("An error occurred during your request.", {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }))
        }
    }
  }

  const result = await calculateSimilarityScores(xq, pdfData)
  
  return (
    new NextResponse(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  )
  }  


