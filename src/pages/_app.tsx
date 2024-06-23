import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <AnimatePresence mode="wait">
      <motion.section key={asPath} className="w-full flex justify-center">
        <motion.section className="relative w-full max-w-[800px]">
          <Component {...pageProps} />
          {asPath !== "/" && <Sidebar />}
        </motion.section>
      </motion.section>
    </AnimatePresence>
  );
}
