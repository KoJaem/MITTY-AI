import Spinner from "@/components/Spinner";
import { notify } from "@/utils/toast";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { SpeechToImageResponse } from "./api/speechToImage";
import { Seo } from '@/components/Seo';

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [text, setText] = useState<string>();
  const [src, setSrc] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (recording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = event => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
          const blob = new Blob(audioChunks.current, { type: "audio/wav" });
          setAudioBlob(blob);
          audioChunks.current = [];
        };
        mediaRecorder.current.start();
      });
    } else {
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
      }
    }
  }, [recording]);

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const resetRecording = () => {
    setAudioBlob(null);
  };

  const sendAudioToApi = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    try {
      setIsLoading(true);
      const response = await axios.post<SpeechToImageResponse>(
        "/api/speechToImage",
        formData
      );

      setText(response.data.speechText);
      setSrc(response.data.image);
    } catch (error) {
      notify();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Seo title='Audio'/>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
        exit={{
          opacity: [1, 0],
          transition: {
            duration: 1,
          },
        }}
        className="min-h-[100vh] h-full bg-primary-30 flex flex-col items-center py-[80px]"
      >
        <section className="flex flex-col items-center gap-[40px]">
          <motion.h1
            whileInView={{
              opacity: [0, 1],
              y: [-50, 0],
              transition: {
                duration: 1,
              },
            }}
            className="text-[40px] font-bold text-primary-100"
            drag
            dragSnapToOrigin
          >
            말하는대로 🎨
          </motion.h1>
          <motion.h2
            // variants={scrollVariants}
            // initial="initial"
            // whileInView="whileInView"
            whileInView={{
              opacity: [0, 1],
              x: [-40, 0],
              y: [50, 0],
              transition: {
                duration: 1,
              },
            }}
            drag
            dragSnapToOrigin
            className="text-[20px] font-semibold"
          >
            버튼을 누르고 상상하는것을 말해보세요!
          </motion.h2>
          <motion.h3
            // variants={scrollVariants}
            // initial="initial"
            // whileInView="whileInView"
            whileInView={{
              opacity: [0, 1],
              x: [-40, 0],
              y: [50, 0],
              transition: {
                duration: 1,
              },
            }}
            drag
            dragSnapToOrigin
            className="text-[16px] font-semibold text-[#6b6b6b]"
          >
            AI가 음성을 인식하여 그림을 그려드립니다!
          </motion.h3>
          <section className="flex flex-col gap-[20px] items-center">
            <article className="flex gap-[4px] w-full">
              <button
                className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black w-full"
                onClick={startRecording}
                disabled={recording || !!audioBlob || isLoading}
              >
                Start
              </button>
              <button
                className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black w-full"
                onClick={stopRecording}
                disabled={!recording || isLoading}
              >
                Stop
              </button>
            </article>

            <button
              className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black w-full"
              onClick={resetRecording}
              disabled={!audioBlob || isLoading}
            >
              다시 녹음하기
            </button>
            <button
              className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black w-full"
              onClick={sendAudioToApi}
              disabled={!audioBlob || isLoading}
            >
              이미지 생성
            </button>
          </section>
          {!src && !text && isLoading && <Spinner />}
          {src && text && (
            <article className="w-full bg-primary-50 p-2 flex flex-col gap-[4px]">
              <article className="relative w-[200px] 2xsm:w-[300px]  xsm:w-[400px] h-[400px] self-center">
                <Image
                  src={src}
                  fill
                  objectFit="contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="Generated Image"
                />
                {isLoading && (
                  <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Spinner />
                  </div>
                )}
              </article>
              <p className="flex w-full justify-end">{text}</p>
            </article>
          )}
        </section>
        <ToastContainer />
      </motion.section>
    </>
  );
}
