import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <AnimatePresence mode="wait">
      <section className='w-full flex justify-center'>
        <motion.section key={asPath} className="relative w-full max-w-[800px]">
          <Component {...pageProps} />
          {asPath !== "/" && <Sidebar />}
        </motion.section>
      </section>
    </AnimatePresence>
  );
}
