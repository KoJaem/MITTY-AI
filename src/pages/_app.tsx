import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import Head from 'next/head';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/titleImage.png" type="image/x-icon" />
        <meta property="og:title" content="MITTY-당신의 상상을 현실로!" />
        <meta
          name="description"
          content="AI가 발전하고 있다는것을 재미있게 체험 해보세요!"
        />
        <meta
          property="og:description"
          content="AI가 발전하고 있다는것을 재미있게 체험 해보세요!"
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <AnimatePresence mode="wait">
        <motion.section key={asPath} className="w-full flex justify-center">
          <motion.section className="relative w-full max-w-[800px]">
            <Component {...pageProps} />
            {asPath !== "/" && <Sidebar />}
          </motion.section>
        </motion.section>
      </AnimatePresence>
    </>
  );
}
