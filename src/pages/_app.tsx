import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <AnimatePresence mode="wait">
      <motion.section key={asPath}>
        <Component {...pageProps} />
      </motion.section>
    </AnimatePresence>
  );
}
