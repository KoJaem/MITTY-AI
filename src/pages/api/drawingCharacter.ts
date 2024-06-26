import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export interface CamToImageResponse {
  url?: string;
}

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

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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
            "입력받은 이미지에 대해서 최대한 분석해줘.  눈, 코, 입, 헤어스타일, 표정, 성별 등등 분석할 수 있는 내용을 모두 분석해. 잡다한 이야기는 하지말고, 분석한 특징들에 대해서만 최대한 많이 나열해서 답변해.",
        },
      ],
    });

    const userFaceInfo = analytics?.choices[0]?.message?.content;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${userFaceInfo} 은 사용자의 얼굴에 대한 정보야. 이 정보를 기반으로 2D 캐릭터를 하나 만들어줘.`,
      n: 1,
      size: "1024x1024",
    });

    return res.status(200).json({ url: response.data[0].url });
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
