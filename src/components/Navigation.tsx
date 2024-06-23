import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <motion.ul
    variants={variants}
    className="px-[20px] absolute top-[100px]"
  >
    {menuItems.map(menuItem => (
      <MenuItem {...menuItem} key={menuItem.id} />
    ))}
  </motion.ul>
);

export interface menuItem {
  id: number;
  color: string;
  icon: string;
  description: string;
  url: string;
}
const menuItems: Array<menuItem> = [
  {
    id: 0,
    color: "#FF008C",
    icon: "💬",
    description: "AI와 채팅하기",
    url: "/main",
  },
  {
    id: 1,
    color: "#D309E1",
    icon: "😄",
    description: "나만의 캐릭터 만들기",
    url: "/video",
  },
  {
    id: 2,
    color: "#9C1AFF",
    icon: "🎤",
    description: "음성인식 그림그리기",
    url: "/audio",
  },
  {
    id: 3,
    color: "#4400FF",
    icon: "🤖",
    description: "나만의 AI 만들기",
    url: "/custom",
  },
];
