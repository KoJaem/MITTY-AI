import { formatConversationHistory } from "@/utils/formatConversationHistory";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

interface FormType {
  chat: string;
}

export default function Main() {
  const [history, setHistory] = useState<Array<string>>([
    "test 첫번째",
    "test 두번째",
    "test 세번째",
    "test 네번째",
  ]);

  const schema = object().shape({
    chat: string().required(`입력 해주세요`),
  });

  const formMethods = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, register, resetField } = formMethods;

  const submit = async (data: FormType) => {
    console.log(data.chat);

    const chat = data.chat;

    resetField("chat");

    const formattedConversationHistory = formatConversationHistory(history);

    setHistory(prev => [...prev, `${chat}`]);

    // Todo chat API Request
    // const { data: response } = await axios.post(
    //   {
    //     chat,
    //     history: formattedConversationHistory,
    //   }
    // );

    // setHistory(prev => [...prev, `${response}`]);
  };

  return (
    <motion.section
      exit={{
        opacity: [1, 0],
        transition: {
          duration: 1,
        },
      }}
      className="min-h-[100vh] h-full bg-primary-30 flex flex-col items-center py-[80px]"
    >
      <div className="flex flex-col items-center gap-[100px]">
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
            상상 더해보기
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
            AI와 대화해보고 상상을 더해보세요!
          </motion.h2>
        </div>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(submit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="flex flex-col gap-2 w-full overflow-auto">
              {history.map((data, i) => {
                return i % 2 === 0 ? (
                  <div
                    className="bg-gray w-fit p-2 rounded-lg self-end ml-[20%]"
                    key={i}
                  >
                    {data}
                  </div>
                ) : (
                  <div
                    className=" bg-amber-300 w-fit p-2 rounded-lg mr-[20%]"
                    key={i}
                  >
                    {data}
                  </div>
                );
              })}
              <input {...register("chat")} />
            </div>
            <button type="submit">제출</button>
          </form>
        </FormProvider>
      </div>
    </motion.section>
  );
}
