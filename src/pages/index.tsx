import { Seo } from '@/components/Seo';
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const scrollVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: [20, 0],
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: [20, -20, 0],
    rotate: [0, -40, 40, 0],
    transition: { duration: 0.5 },
  },
};

const dragConstraints = {
  right: 0,
};

export default function Index() {
  const router = useRouter();

  return (
    <>
    <Seo />
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
      className="h-full bg-primary-30 flex flex-col items-center py-[80px]"
    >
      <section className="flex flex-col items-center gap-[100px] h-full">
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
            dragConstraints={{
              left: -100,
              top: 0,
              right: 100,
              bottom: 100,
            }}
            dragElastic={0.2}
          >
            M I T T Y
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
            dragConstraints={dragConstraints}
            className="text-[20px] font-semibold"
          >
            우리의 상상은 현실이 된다
          </motion.h2>
        </article>
        <motion.div
          drag
          dragConstraints={{
            left: -100,
            top: -100,
            right: 100,
            bottom: 100,
          }}
          whileInView={{
            opacity: [0, 1],
            transition: {
              duration: 1,
            },
          }}
          className="relative w-[100px] h-[100px]"
        >
          <ChatBubbleOvalLeftEllipsisIcon color="#73d898" />
        </motion.div>
        <motion.p
          className="font-semibold"
          // variants={scrollVariants}
          // initial="initial"
          // whileInView="whileInView"
          whileInView={{
            opacity: [0, 1],
            x: [40, 0],
            y: [-50, 0],
            transition: {
              duration: 1,
            },
          }}
          drag
          dragConstraints={dragConstraints}
        >
          우리는 상상의 시대에 살고있어요
        </motion.p>
        <motion.p
          className="font-semibold"
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
          drag
          dragConstraints={dragConstraints}
        >
          AI와 대화하기
        </motion.p>
        <motion.p
          className="font-semibold"
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
          drag
          dragConstraints={dragConstraints}
        >
          내 얼굴로 캐릭터 만들기
        </motion.p>
        <motion.p
          className="font-semibold"
          variants={scrollVariants}
          initial="initial"
          whileInView="whileInView"
          drag
          dragConstraints={dragConstraints}
        >
          나만의 AI 커스텀까지..
        </motion.p>
        <div className="flex">
          <motion.p
            className="font-semibold"
            variants={scrollVariants}
            initial="initial"
            whileInView="whileInView"
            drag
            dragSnapToOrigin
          >
            이 모든것을 한번에 모아놓은
          </motion.p>
          <motion.div
            className="ml-[4px] flex gap-[4px]"
            variants={container}
            initial="hidden"
            whileInView="show"
            drag
            dragSnapToOrigin
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
          drag
          dragConstraints={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
          dragSnapToOrigin
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
          onClick={() => router.push("/main")}
          className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100"
        >
          시작하기
        </motion.button>
      </section>
    </motion.section>
    </>
  );
}
