import formidable, { File } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import path from "path";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { files } = await parseForm(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file || !(file as File).filepath) {
      res.status(400).json({ message: "No file uploaded" });
      return;
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

      res.status(200).json({
        speechText,
        image: response.data[0].url,
      });
    } catch (error) {
      res.status(500).json({ message: "Error transcribing the audio", error });
    } finally {
      fs.unlinkSync(filePath); // 처리 후 파일 삭제
    }
  } catch (error) {
    res.status(500).json({ message: "Error parsing the files", error });
  }
};

export default handler;
