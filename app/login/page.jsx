"use client";

import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <section className="mx-auto md:w-[30rem] h-[25rem] rounded-lg flex flex-col mt-40 gap-4 border-2 box-content p-6">
      <h1 className="font-bold text-3xl">Sign in</h1>
      <input
        className="border-2 outline-none py-3 px-4 rounded-md"
        type="text"
        placeholder="email or phone"
      />
      <input
        className="border-2 outline-none py-3 px-4 rounded-md"
        type="password"
        placeholder="password"
      />
      <button className="bg-blue-400 h-10 rounded-md font-bold">Sign In</button>
      <p className=" text-center border-b-2">or</p>
      <div className="relative">
        <Image
          width={20}
          height={20}
          alt="google_icon"
          src="/images/google.png"
          className="absolute top-3 left-36"
        ></Image>
        <button
          className="border-2 h-10 rounded-md w-full"
          onClick={async () => {
            await signIn("google", { callbackUrl: "/" });
          }}
        >
          Sign In with Google
        </button>
      </div>
    </section>
  );
};

export default login;
