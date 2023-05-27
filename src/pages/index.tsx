import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@ejpb/styles/Home.module.css";
import BookCove from "@ejpb/components/BookCave";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>BookCove</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../assets/bookIcon.png" />
      </Head>
      <main>
        <BookCove />
      </main>
    </>
  );
}
