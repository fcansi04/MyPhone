"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Nav = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: session } = useSession();
  const [openSearch, setOpenSearch] = useState(false);

  const [showButtons, setShowButtons] = useState(false);

  const butonShowHandler = () => {
    setShowButtons((prev) => !prev);
  };

  return (
    <section className="z-10 px-40 fixed top-0 bg-white h-20 pt-5 pb-5 box-content flex  items-center ">
      <Link href="/" className="text-xl font-semibold mr-20 ">
        BelsaGSM
      </Link>
      <form action="submit" className="xl:w-[40rem] relative">
        <input
          type="text"
          value={searchValue}
          enterKeyHint="go"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="arayınız"
          className="py-2 px-6 w-[80%] outline-none bg-gray-200 rounded"
        />
      </form>
      <nav className="flex items-center gap-8 relative">
        {session?.user ? (
          <div className={` `}>
            <Image
              className="rounded-full "
              width={40}
              height={40}
              alt="x"
              src={session.user?.image}
              onClick={butonShowHandler}
            />
            <div
              className={`absolute right-[130px] top-0 items-center bg-white shadow p-10 flex gap-4 flex-col ${
                showButtons ? "" : "hidden"
              }`}
            >
              {" "}
              <Link href="/favoriler">Favorilerim</Link>
              <Link href="sepetim">Sepetim</Link>
              <button
                onClick={() => {
                  signOut();
                }}
                className="bgOrange w-[120px] rounded-full p-2 hover:opacity-80"
              >
                çıkış yap
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link className="bg-blue-400 py-2 px-4 rounded-full" href="/login">
              Giriş Yap
            </Link>
          </>
        )}

        {session?.user.email === "ferocansi04@gmail.com" ? (
          <Link href="/Admin">Admin</Link>
        ) : (
          ""
        )}
      </nav>
    </section>
  );
};

export default Nav;
