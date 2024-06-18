import axios from "axios";
import { useEffect, useRef } from "react";

export default function VideoCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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
    initCamera();
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/jpeg");
        sendImageToAPI(dataUrl);
      }
    }
  };

  const sendImageToAPI = async (base64Image: string) => {
    try {
      const response = await axios.post("/api/drawingCharacter", {
        image: base64Image,
      });
      console.log("Image processed:", response.data);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted playsInline></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button onClick={captureImage}>Capture Image</button>
    </div>
  );
}
