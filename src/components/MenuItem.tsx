import { motion } from "framer-motion";
import { menuItem } from './Navigation';
import { useRouter } from 'next/router';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = (props: menuItem) => {
  // const style = { border: `2px solid ${colors[i]}` };
  const router = useRouter()
  return (
    <motion.li
      className="mb-[20px] flex items-center cursor-pointer"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`w-[40px] h-[40px] rounded-full mr-[20px] border-[2px] border-solid flex items-center justify-center`}
        style={{
          borderColor: props.color,
        }}
      >{props.icon}</div>
      <div
        className="rounded-md flex items-center justify-center h-[20px] flex-1 border-[2px] border-solid whitespace-nowrap p-4"
        onClick={() => router.push(props.url)}
        style={{
          borderColor: props.color,
        }}
      >{props.description}</div>
    </motion.li>
  );
};
