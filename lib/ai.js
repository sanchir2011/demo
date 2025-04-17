'use server'

import { GoogleGenAI, createUserContent, createPartFromUri, HarmBlockThreshold, HarmCategory } from "@google/genai";
import { config } from "dotenv";
config();

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
  },
]

export async function summarizeImage(file) {
  try {
    if (!process.env.API_KEY) throw new Error("API_KEY олдсонгүй");
    if (!file) throw new Error("Зураг хоосон байна");

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const myfile = await ai.files.upload({
      file: `uploads/${file.name.replace(/\s+/g, "_")}`,
      config: { mimeType: file.type },
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(myfile.uri, myfile.mimeType),
        "Summarize the content of the image in Mongolian.",
      ]),
      safetySettings,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function generateDomainName(userPromt) {
  try {
    if (!process.env.API_KEY) throw new Error("API_KEY олдсонгүй");
    if (!userPromt) throw new Error("Чиглэл хоосон байна");

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent(userPromt),
      config: {
        systemInstruction: "You are domain name generator AI. Generate a list of domain names based on the user's input. Domain names should be catchy and easy to remember. Provide a list of 10 domain names. All of them MUST end with .mn and MUST have at least 3 letters. Return the output with ONLY array format like ['example1.mn', 'example2.mn'] without any other symbols or texts.",
      },
      responseMimeType: "application/json",
      safetySettings,
    });

    let result = response.text;
    result = result.replaceAll('```', '').replaceAll('json', '');
    if(!JSON.parse(result)) return result
    return JSON.parse(result);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function replyToEmail(emailContent) {
  try {
    
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}