import { formatOpenAIChatHistory } from "@/utils/formatHistory";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

interface FormType {
  chat: string;
}

export default function Main() {
  const [history, setHistory] = useState<Array<string>>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const schema = object().shape({
    chat: string().required(`입력 해주세요`),
  });

  const formMethods = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    register,
    resetField,
    formState: { isSubmitting },
  } = formMethods;

  const submit = async (data: FormType) => {
    console.log(data.chat);

    const chat = data.chat;

    resetField("chat");

    const formattedOpenAIChatHistory = formatOpenAIChatHistory(history);

    setHistory(prev => [...prev, `${chat}`]);

    const response = await axios.post("/api/chat", {
      chat,
      history: formattedOpenAIChatHistory,
    });

    setHistory(prev => [...prev, `${response.data}`]);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

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
            상상 더하기
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
            상상력이 풍부한 AI와 대화 해보세요!
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
            여러분의 이야기에 재치있는 대답을 해줄거에요!
          </motion.h3>
        </div>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(submit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="relative flex flex-col w-full bg-primary h-[400px] px-[16px] pt-[12px] pb-[64px] rounded-md">
              <div
                className="flex flex-col gap-2 w-[200px] md:w-[400px] overflow-auto h-[360px] z-[999px]"
                ref={chatContainerRef}
              >
                {history.map((data, i) => {
                  return i % 2 === 0 ? (
                    <div
                      className="bg-gray p-4 rounded-md self-end ml-[20px] mr-[4px] break-all"
                      key={i}
                    >
                      {data}
                    </div>
                  ) : (
                    <div
                      className=" bg-amber-300 w-fit p-4 rounded-md ml-[4px] mr-[20px] break-all"
                      key={i}
                    >
                      {data}
                    </div>
                  );
                })}
                {isSubmitting && (
                  <div className="flex w-full items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                      loading...
                    </div>
                  </div>
                )}
              </div>
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
                  <PaperAirplaneIcon color="#ADADAD" width={20} height={20} />
                </button>
              </article>
            </div>
          </form>
        </FormProvider>
      </div>
    </motion.section>
  );
}
