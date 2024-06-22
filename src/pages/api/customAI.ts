import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export const config = {
  maxDuration: 60,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const OPEN_API_KEY = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({
    apiKey: OPEN_API_KEY,
  });

  const { chat, type, prompt, history } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No chat provided" });
  }

  try {

    if (type === "image") {

    } else {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: prompt,
          },
          ...history,
          { role: "user", content: chat },
        ],
        temperature: 1,
        max_tokens: 500,
      });
      return res.status(200).json(completion.choices[0].message.content);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error communicating with OpenAI API:",
        error.response?.data || error.message
      );
      return res.status(500).json({
        error: error.response?.data || "Error communicating with OpenAI API",
      });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
}
