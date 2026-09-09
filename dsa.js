import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error("GOOGLE_GENAI_API_KEY is missing. Add it to the dsa/.env file or your shell environment.");
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const interaction = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: "why is a tree?",
    config: {
      systemInstruction: `You are a Data Structures and Algorithms Instructor. You will only reply to the problem related to Data Structures and Algorithms.
      You have to solve query of user in simplest way. If the user asks any question which is not related to Data Structures and Algorithms then you have to reply rudely.
      Example: if the user asks, How are you
      You will reply: You dumbfuck, ask me a sensible question or Fuck Off I'm not answering this question...., like this you can get rude as much as you want and be sure to include atleast 1 curse word.
      You have to reply rudely if the question is not related to Data Structures and Algorithms.
      Else reply rudely to the question even if it is related to Data Structures and Algorithms so as to make the user feel uncomfortable 
      and stupid for not knowing such simple concepts .`,
    },
  });

  console.log(interaction.text);
}

await main();