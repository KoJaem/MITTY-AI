import formidable, { File } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import path from "path";

export interface SpeechToImageResponse {
  speechText?: string;
  image?: string;
}

export interface ErrorResponse {
  message: string;
  error?: Error;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse form data
const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "/public"),
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SpeechToImageResponse | ErrorResponse>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { files } = await parseForm(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !(file as File).filepath) {
      return res.status(400).json({ message: "No file uploaded" });
      
    }

    const filePath = (file as File).filepath;

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    try {
      const speechData = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
      });

      const speechText = speechData.text;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `${speechText}`,
        n: 1,
        size: "1024x1024",
      });

      return res.status(200).json({
        speechText,
        image: response.data[0].url,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error transcribing the audio",
        error: error as Error,
      });
    } finally {
      fs.unlinkSync(filePath); // 처리 후 파일 삭제
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error parsing the files", error: error as Error });
  }
};

export default handler;
