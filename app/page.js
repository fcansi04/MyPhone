import Image from "next/image";
import Feed from "@/Components/Feed";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&"
        />
      </Head>
      <Feed />
    </>
  );
}
