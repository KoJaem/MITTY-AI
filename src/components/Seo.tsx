import Head from "next/head";
type Props = {
  title?: string;
};
export const Seo = ({ title }: Props) => {
  return (
    <Head>
      <title>{`MITTY${title ? ` | ${title}` : ""}`}</title>
    </Head>
  );
};
