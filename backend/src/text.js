import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// API initialize
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// model select karo
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

export async function chatWithAI(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// test
chatWithAI("Hello AI, what is JavaScript?")
  .then(console.log)
  .catch(console.error);