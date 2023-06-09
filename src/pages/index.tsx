import Head from "next/head";
import { Inter } from "next/font/google";
import BookCove from "@ejpb/components/BookCave";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>BookCove</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <main>
        <BookCove />
      </main>
    </>
  );
}
