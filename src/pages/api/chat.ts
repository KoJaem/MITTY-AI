import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

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

  const { chat, history } = req.body;

  if (!chat) {
    return res.status(400).json({ error: "No chat provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "너는 친절한 assistant야. 전체 messages 의 맥락을 파악하여 대답해. 사용자가 말하는 이아기에 상상을 추가해서 재미있는 스토리로 바꿔줘.",
        },
        ...history,
        { role: "user", content: chat },
      ],
      temperature: 1,
    });

    res.status(200).json(completion.choices[0].message.content);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error communicating with OpenAI API:",
        error.response?.data || error.message
      );
      res.status(500).json({
        error: error.response?.data || "Error communicating with OpenAI API",
      });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
}
