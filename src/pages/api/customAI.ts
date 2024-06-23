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

  const { chat, type, prompt, history, image } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No chat provided" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (type === "image") {
      const analytics = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
          {
            role: "system",
            content:
              "해당 이미지에 대해 분석할 수 있는 내용을 모두 분석해. 잡다한 이야기는 하지말고, 분석한 특징들에 대해서만 최대한 많이 나열해서 답변해. 이미지는 캐릭터, 사람얼굴, 그림 등등 뭐가 올지 모르니까 확실하게 분석해.",
          },
        ],
      });

      const imageFileInfo = analytics?.choices[0]?.message?.content;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `${imageFileInfo} 의 정보를 기반으로 ${prompt}`,
        n: 1,
        size: "1024x1024",
      });

      return res.status(200).json({ url: response.data[0].url });
    } else {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `${prompt}. 대답할때 마크다운 문법을 사용하지마.`,
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
