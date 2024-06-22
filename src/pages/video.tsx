import LoadingWithBG from "@/components/LoadingWithBG";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CamToImageResponse } from "./api/drawingCharacter";

export default function VideoCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [thumbnail, setThumbnail] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [src, setSrc] = useState<string>();

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  useEffect(() => {
    initCamera();
  }, []);

  const captureImage = () => {
    setIsLoading(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/jpeg");
        setThumbnail(dataUrl);
        sendImageToAPI(dataUrl);
      }
    }
  };

  const sendImageToAPI = async (base64Image: string) => {
    try {
      const response = await axios.post<CamToImageResponse>(
        "/api/drawingCharacter",
        {
          image: base64Image,
        }
      );
      setSrc(response.data.url);
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    setThumbnail(undefined);
    setSrc(undefined);
    initCamera();
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
      className="min-h-[100vh] h-full bg-primary-30 flex flex-col items-center py-[80px] gap-[40px]"
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
          나만의 캐릭터 만들기 😄
        </motion.h1>
        <motion.h2
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
          카메라를 보고 활짝웃으며 버튼을 눌러봐요!
        </motion.h2>
        <motion.h3
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
          AI가 여러분의 얼굴로 캐릭터를 만들어드립니다!
        </motion.h3>
      </section>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-[100vw] 2xsm:w-[300px] xsm:w-[400px] h-[200px] 2xsm:h-[300px] xsm:h-[400px] flex items-center">
            {!thumbnail ? (
              <video
                ref={videoRef}
                className="w-full h-full"
                autoPlay
                muted
                playsInline
              />
            ) : (
              <Image
                src={src ?? thumbnail}
                fill
                className='rounded-md'
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="User Image"
              />
            )}
            {thumbnail && isLoading && (
              <div className="w-full text-center">
                <LoadingWithBG text="이미지 생성중..." />
              </div>
            )}
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          {!src && (
            <button
              className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black w-fit"
              onClick={captureImage}
              disabled={isLoading || !!thumbnail}
            >
              사진찍기
            </button>
          )}
          {src && (
            <button
              className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100 disabled:bg-gray disabled:text-black w-fit mt-[37.5px]"
              onClick={resetImage}
              disabled={isLoading || !thumbnail}
            >
              다시찍기
            </button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
