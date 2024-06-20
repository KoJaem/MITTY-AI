import axios from "axios";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

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

  const sendAudioToApi = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    try {
      const response = await axios.post("/api/speechToImage", formData);
      console.log("파일 전송 성공", response.data);
    } catch (error) {
      console.error("파일 전송 실패", error);
    }
  };

  return (
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
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex flex-col items-center gap-[40px]">
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
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[4px]">
              <button
                className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black"
                onClick={startRecording}
                disabled={recording}
              >
                Start
              </button>
              <button
                className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black"
                onClick={stopRecording}
                disabled={!recording}
              >
                Stop
              </button>
            </div>

            <button
              className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black"
              onClick={startRecording}
              disabled={!audioBlob}
            >
              다시 녹음하기
            </button>
            <button
              className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black"
              onClick={sendAudioToApi}
              disabled={!audioBlob}
            >
              Send to API
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
