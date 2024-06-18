import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

const TitleVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, y: [-50, 0], transition: { duration: 0.5 } },
};

const scrollVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: [50, 0],
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, y: [20, -20, 0], transition: { duration: 0.5 } },
};

export default function Index() {
  return (
    <div className="min-h-[100vh] h-full bg-primary-30 flex flex-col items-center py-[80px]">
      <div className="flex flex-col items-center gap-[100px]">
        <div className="flex flex-col items-center gap-[40px]">
          <motion.h1
            variants={TitleVariants}
            initial="hidden"
            whileInView="show"
            className="text-[40px] font-bold text-primary-100"
            drag
            dragConstraints={{
              left: -100,
              top: 0,
              right: 100,
              bottom: 100,
            }}
          >
            M I T T Y
          </motion.h1>
          <motion.h2
            variants={scrollVariants}
            initial="initial"
            whileInView="whileInView"
            className="text-[20px] font-semibold"
          >
            우리의 상상은 현실이 된다
          </motion.h2>
        </div>
        <motion.div
          drag
          dragConstraints={{
            left: -100,
            top: -100,
            right: 100,
            bottom: 100,
          }}
          className="relative w-[100px] h-[100px]"
        >
          <ChatBubbleOvalLeftEllipsisIcon color="#73d898" />
        </motion.div>
        <motion.p
          className="font-semibold"
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
        >
          우리는 상상의 시대에 살고있어요
        </motion.p>
        <motion.p
          className="font-semibold"
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
        >
          AI와 대화하기
        </motion.p>
        <motion.p
          className="font-semibold"
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
        >
          내 얼굴로 캐릭터 만들기
        </motion.p>
        <motion.p
          className="font-semibold"
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
        >
          나만의 AI 커스텀까지..
        </motion.p>
        <div className="flex">
          <motion.p
            className="font-semibold"
            variants={scrollVariants}
            initial="initial"
            whileInView="whileInView"
          >
            이 모든것을 한번에 모아놓은
          </motion.p>
          <motion.div
            className="ml-[4px] flex gap-[4px]"
            variants={container}
            initial="hidden"
            whileInView="show"
            drag
            dragConstraints={{
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <motion.span
              variants={item}
              className="text-primary-100 font-semibold"
            >
              M
            </motion.span>
            <motion.span
              variants={item}
              className="text-primary-100 font-semibold"
            >
              I
            </motion.span>
            <motion.span
              variants={item}
              className="text-primary-100 font-semibold"
            >
              T
            </motion.span>
            <motion.span
              variants={item}
              className="text-primary-100 font-semibold"
            >
              T
            </motion.span>
            <motion.span
              variants={item}
              className="text-primary-100 font-semibold"
            >
              Y
            </motion.span>
            <motion.span
              variants={item}
              className="text-primary-100 font-semibold"
            >
              !
            </motion.span>
          </motion.div>
        </div>
        <motion.p
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
          className="font-semibold"
        >
          지금 여러분의 상상을 그려보세요! 🎨
        </motion.p>
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100"
        >
          시작하기
        </motion.button>
      </div>
    </div>
  );
}
