import { GoogleGenerativeAI } from "@google/generative-ai"
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });
  

  //adjust temperature, max token based on chatgpt
  const generationConfig = {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
    });
  
   