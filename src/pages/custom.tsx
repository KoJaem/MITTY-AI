import Loading from "@/components/Loading";
import { formatOpenAIChatHistory } from "@/utils/formatHistory";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { object, string } from "yup";

interface FormType {
  chat?: string;
  type: "chat" | "image";
  prompt: string;
  imageFile?: FileList;
}

export default function Custom() {
  const [history, setHistory] = useState<Array<string>>([]);
  const [promptDisable, setPromptDisable] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [generatedImageSrc, setGeneratedImageSrc] = useState<string>();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const schema = () =>
    object().shape({
      type: string().oneOf(["chat", "image"]).required(`타입을 선택해주세요`),
      chat: string().test(
        "type 이 chat인 경우에는 chat 필드 필요",
        "채팅을 입력해주세요",
        function (value) {
          const { type } = this.parent;
          if (type === "chat") {
            return !!value;
          }
          return true;
        }
      ),
      prompt: string().required(`프롬프트를 입력해주세요`),
    });

  const formMethods = useForm<FormType>({
    defaultValues: {
      type: "chat",
    },
    resolver: yupResolver(schema()),
  });

  const {
    handleSubmit,
    register,
    resetField,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = formMethods;

  const watchRadio = useWatch({
    control,
    name: "type",
  });

  const submit = async (data: FormType) => {
    setPromptDisable(true);

    const { chat, type, prompt, imageFile } = data;

    if (type === "chat") {
      resetField("chat");

      const formattedOpenAIChatHistory = formatOpenAIChatHistory(history);

      setHistory(prev => [...prev, `${chat}`]);

      const response = await axios.post("/api/customAI", {
        chat,
        type,
        prompt,
        history: formattedOpenAIChatHistory,
      });

      setHistory(prev => [...prev, `${response.data}`]);
    }

    if (type === "image") {
      // FileList validation
      if (!data.imageFile || data.imageFile.length === 0) {
        return;
      }

      const file = data.imageFile[0];
      const base64Image = await convertToBase64(file);

      try {
        const response = await axios.post("/api/customAI", {
          image: base64Image,
          type,
          prompt,
        });

        console.log(response.data.url);
        setGeneratedImageSrc(response.data.url);
      } catch (error) {
        console.error("Failed to upload image", error);
      }
    }
  };

  console.log(generatedImageSrc)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setThumbnail(""); // 취소 된 경우 썸네일 삭제로직

    if (e.target.value[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files![0]);
      fileReader.onload = () => {
        setThumbnail(String(fileReader.result!));
      };
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
      <section className="flex flex-col items-center gap-[40px]">
        <article className="flex flex-col items-center gap-[40px]">
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
            나만의 AI 만들기 🤖
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
            AI에게 명령을 내려보세요!
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
            여러분만의 AI를 탄생 시켜드립니다
          </motion.h3>
        </article>
        <section className="flex gap-[4px] justify-around w-full">
          <article className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="chat"
                  type="radio"
                  value="chat"
                  className="w-6 h-6 text-blue-600"
                  {...register("type")}
                />
              )}
            />
            <label
              htmlFor="chat"
              className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              나만의 챗봇 만들기
            </label>
          </article>
          <article className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="image"
                  type="radio"
                  value="image"
                  className="w-6 h-6 text-blue-600"
                  {...register("type")}
                />
              )}
            />

            <label
              htmlFor="image"
              className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              나만의 그림생성 AI 만들기
            </label>
          </article>
        </section>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(submit)}
            className="w-full flex flex-col justify-center gap-[8px]"
          >
            <article className="flex flex-col gap-[8px]">
              <p className="text-[16px]">
                {watchRadio === "chat"
                  ? "어떤 대답을 하는 AI를 만드시겠어요?"
                  : "어떤 이미지를 생성하는 AI를 만드시겠어요?"}
              </p>
              <p className="text-[14px] text-[#6b6b6b]">
                {watchRadio === "chat"
                  ? `ex) 사용자는 지금 우울한 상태야.. 친절하게 위로의 말을 건네줘`
                  : "분석한 이미지를 게임캐릭터처럼 만들어줘."}
              </p>
              <input
                type="text"
                disabled={promptDisable}
                className="rounded-md py-2 pl-4 pr-[24px] h-[40px] outline-none disabled:bg-gray disabled:text-black"
                placeholder="AI에게 명령을 내려보세요."
                {...register("prompt")}
              />
            </article>
            <article className="relative flex flex-col w-full bg-primary h-[400px] px-[16px] pt-[12px] pb-[64px] rounded-md">
              {watchRadio === "chat" ? (
                <>
                  <article
                    className="flex flex-col gap-2 w-[300px] md:w-[400px] overflow-auto h-[360px] z-[999px]"
                    ref={chatContainerRef}
                  >
                    {history.map((data, i) => {
                      return i % 2 === 0 ? (
                        <p
                          className="bg-primary-30 px-[12px] py-[8px] rounded-md self-end ml-[20px] mr-[4px] break-all leading-5"
                          key={i}
                        >
                          {data}
                        </p>
                      ) : (
                        <p
                          className="bg-purple-300 w-fit px-[12px] py-[8px] rounded-md ml-[4px] mr-[20px] break-all leading-5"
                          key={i}
                        >
                          {data}
                        </p>
                      );
                    })}
                    {isSubmitting && <Loading />}
                  </article>
                  <article className="absolute bottom-[12px] left-1/2 translate-x-[-50%] flex items-center justify-center w-full">
                    <input
                      className="rounded-md py-2 pl-4 pr-[24px] h-[40px] outline-none"
                      {...register("chat")}
                      placeholder="무슨 이야기가 하고싶으신가요?"
                      style={{
                        width: "calc(100% - 32px)",
                      }}
                    />
                    <button
                      className="absolute end-[20px]"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <PaperAirplaneIcon
                        color="#ADADAD"
                        width={20}
                        height={20}
                      />
                    </button>
                  </article>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("imageFile", { required: true })}
                    onChange={e => {
                      handleThumbnail(e);
                    }}
                  />
                  <div className="relative w-full h-full">
                    <Image src={thumbnail || "/"} fill alt="Image" />
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    서브밋
                  </button>
                </>
              )}
            </article>
          </form>
        </FormProvider>
      </section>
    </motion.section>
  );
}
