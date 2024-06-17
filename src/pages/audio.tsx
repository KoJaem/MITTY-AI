// pages/index.tsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
      const response = await axios.post("/api/speechToText", formData);
      console.log("파일 전송 성공", response.data);
    } catch (error) {
      console.error("파일 전송 실패", error);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop
      </button>
      <button onClick={sendAudioToApi} disabled={!audioBlob}>
        Send to API
      </button>
    </div>
  );
}
