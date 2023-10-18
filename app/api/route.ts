// import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server"
import { delay } from 'framer-motion';

// Initialize Openai
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

if (!openai.apiKey) {
  console.log("Error");
  // return;
} else {
  console.log("It's working");
}

// Declare constants
const COMPLETIONS_MODEL = "text-davinci-003";
const EMBEDDING_MODEL = "text-embedding-ada-002";
const supaUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL
const supaKey: any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supaUrl, supaKey);

export async function POST(request: Request) {
  type History = {
    role: string;
    content: string;
  };

  const json = await request.json()
  // const nameOfFile = localStorage.getItem("file");
  const userId = "1111"
  // json.userId
  // console.log("This is the json: ", nameOfFile)
  
  // const { data: pdfData } = await supabase.from('pdfs').select('*').eq('pdf_name', nameOfFile).eq('user_id', userId);

  // console.log("extracted: ", JSON.stringify(pdfData)) 

  // if(pdfData !== null){
  //   console.log("length of file: ", pdfData.length)
  // }


  if (!openai.apiKey) {
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

  // const queryEmbedding = await openai.createEmbedding({
  //   model: EMBEDDING_MODEL,
  //   input: query,
  // });
  // console.log("openai point:", query);

  // const xq = queryEmbedding.data.data[0].embedding;

  // console.log("embedding: "+ xq)  

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
    
      pdfData.forEach((row: { vector_data: any[]; }) => {
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
    //   try {
    //     // const model = new OpenAI({});
    //     // const memory = new BufferMemory();
    //     const response = await openai.createCompletion({
    //       model: COMPLETIONS_MODEL,
    //       prompt: finalPrompt,
    //       max_tokens: 2048,
    //     });
    
    //     // const chain = new ConversationChain({ llm: model, memory: memory });
    //     // const completion = await chain.call({ input: finalPrompt });
    
    //     const completion: string | undefined = response.data.choices[0].text;
    //     console.log(completion);
    //     console.log(query);
    
    //     const result = {
    //       query: query,
    //       completion: completion
    //     }

    //     console.log("Funny how this will work: " + result)
        
    //     return result
    //   } catch (error: any) {
    //     if (error.response) {
    //       console.error(error.response.status, error.response.data);
    //       return (new NextResponse(error.response.data, {
    //         status: error.response.status,
    //         headers: { "Content-Type": "application/json" },
    //       }))
    //       // res.status().json();
    //     } else {
    //       console.error(`Error with request: ${error.message}`);
    
    //       return (new NextResponse("An error occurred during your request.", {
    //         status: 500,
    //         headers: { "Content-Type": "application/json" },
    //       }))
    //     }
    // }
  }
  
  // if(pdfData !== null && pdfData.length === 0){
      // const finalPrompt = `
      //     Question: ${query}.
      //     Answer:
      //   `;
        const deleteLastQuestion = async () => {
          console.log("Delete question")
          try{
            const { data: rowData, error } = await supabase
            .from('chats')
            .select('chats')
            .eq('user_id', userId);
        
            if (rowData && rowData.length > 0) {
              const newArray = rowData[0].chats;
              const revertedArray = newArray.pop();
        
              if (revertedArray) {
                try {
                  const { data: revertedData, error: revertError } = await supabase
                  .from('chats')
                  .update({ chats: revertedArray })
                  .eq('user_id', userId);
              
                if (revertError) {
                  // Handle the update error.
                  console.log(revertError)
                } else {
                  // Handle the successful update.
                  console.log(revertedData)
                }          
                } catch (err) {
                  console.log(err)
                }
              }
            }
          }catch(err){
            console.log(err)
          }    
        }

        const getChatHistory = async () => {
          const condition = { column_value: userId }; // Replace with your own condition

          function delay(ms: number | undefined) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

          const data = await delay(5000).then(async () => {
            const { data, error } = await supabase
              .from('chats')
              .select()
              .eq('user_id', condition.column_value);
        
            if (error) {
              console.log(error);
              if(history.length % 2 !== 0 && history.length !== 0){
              deleteLastQuestion()
            } 
            } else {
              console.log("This is the get chat history: " + JSON.stringify(data[0].chats));
              return data[0].chats;
            }
          });
        
          return data;
        }              

      try {
        const createUser = async () => {
          const { data, error } = await supabase
          .from('chats')
          .insert([{ user_id: userId,  chats: [{role: 'user', content: query}]}])
          .select()

          console.log(data)
        }
        
        const upsertAssistant = async (response: string | null) => {
          const { data: rowData, error } = await supabase
          .from('chats')
          .select('chats')
          .eq('user_id', userId);

          if (rowData && rowData.length > 0) {
            const currentArray = rowData[0].chats;
            const newValue = {role: 'assistant', content: response};
            
            const updatedArray = [...currentArray, newValue];           
            // You can also perform other modifications as needed.

            if (updatedArray) {
              const { data: updatedData, error: updateError } = await supabase
                .from('chats')
                .update({ chats: updatedArray })
                .eq('user_id', userId);
            
              if (updateError) {
                // Handle the update error.
                console.log(updateError)
              } else {
                // Handle the successful update.
                console.log(updatedData)
              }
            }
          }
        }

        const upsertUser = async () => {
          const { data: rowData, error } = await supabase
          .from('chats')
          .select('chats')
          .eq('user_id', userId);

          if (rowData && rowData.length > 0) {
            const currentArray = rowData[0].chats;
            const newValue = {role: 'user', content: query};
            
            const updatedArray = [...currentArray, newValue];           
            // You can also perform other modifications as needed.

            if (updatedArray) {
              const { data: updatedData, error: updateError } = await supabase
                .from('chats')
                .update({ chats: updatedArray })
                .eq('user_id', userId);
            
              if (updateError) {
                // Handle the update error.
                console.log(updateError)
              } else {
                // Handle the successful update.
                console.log(updatedData)
              }
            }
          }
        }

        const checkIfRowExists = async () => {
          const condition = { column_value: userId }; // Replace with your own condition

          const { data, error } = await supabase
          .from('chats')
          .select()
          .eq('user_id', condition.column_value);

          if (data && data.length > 0) {
            upsertUser()
          } else {
            createUser()
          }
        }
        
        const processAnswers = async () => {

          
            function delay(ms: number | undefined) {
              return new Promise(resolve => setTimeout(resolve, ms));
            }
            try{
              const result = delay(7000).then(async () => {
              const history: any = await getChatHistory()
              console.log("This is the history: " + history)
              console.log("This is the history: " + JSON.stringify(history))
  
              
                const chatCompletion = await openai.chat.completions.create({
                  messages: history,
                  model: 'gpt-3.5-turbo',
                });
  
                console.log("This is the chat completion: " + JSON.stringify(chatCompletion))
              
                console.log("This is the chat completion.choices " + JSON.stringify(chatCompletion.choices));
                
                const chatResponse = chatCompletion.choices[0].message.content
  
                console.log("This is the chat response: " + chatResponse)
                
                upsertAssistant(chatResponse)
  
                const history2: any = await getChatHistory()
  
                const result: any = {
                  query: history2,
                  completion: chatResponse
                }
  
                return result 
            })
            return result
          }catch(err){
            console.log("Finally this is the error: " + err)
            const history: any = await getChatHistory()
            if(history.length % 2 !== 0 && history.length !== 0){
              deleteLastQuestion()
            }            
          }          
        }

        await checkIfRowExists()
        const result = await processAnswers()

        if(!result) {
          console.log("There was no result")
        }
        
        // const model = new OpenAI({});
        // const memory = new BufferMemory();
        // const response = await openai.createCompletion({
        //   model: COMPLETIONS_MODEL,
        //   prompt: finalPrompt,
        //   max_tokens: 2048,
        // });
        // const messages = []        
        
        // messages.push({
        //   role: 'user',
        //   content: query
        // })
      
        // const chain = new ConversationChain({ llm: model, memory: memory });
        // const completion = await chain.call({ input: finalPrompt });
    
        // const completion: string | undefined = response.data.choices[0].text;
        // console.log(completion);
        // console.log(query);
    
        // const result = {
        //   query: query,
        //   completion: completion
        // }

        // console.log("Funny how this will work: " + result)
        return (
          new NextResponse(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        )
      }catch(err){
        console.log("This was the error"+ err)
        const history: any = await getChatHistory()
        if(history.length % 2 !== 0 && history.length !== 0){
          deleteLastQuestion()
        }
        console.log("There was no result 2")
      }
  // }else{
  //   const xq: any = "Ifiok"
  //   const result = await calculateSimilarityScores(xq, pdfData)
  
  //   return (
  //     new NextResponse(JSON.stringify(result), {
  //       status: 200,
  //       headers: { "Content-Type": "application/json" },
  //     })
  //   )
  // }
}  


