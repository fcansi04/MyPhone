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
    <section className="bgOrangeOp z-10  fixed top-0 bg-white h-20 pt-5 pb-5 flex  items-center w-full justify-center max-sm:justify-between max-sm:px-5 ">
      <Link href="/" className="text-xl font-semibold mr-20 ">
        BelsaGSM
      </Link>
      <form
        action="submit"
        className="lg:w-[40rem] md:w-[30rem]  sm:w-[20rem] max-sm:hidden   relative"
      >
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
              className={`absolute right-[130px] top-0 items-center bg-white shadow px-10 py-4 flex gap-4 flex-col ${
                showButtons ? "" : "hidden"
              }`}
            >
              {" "}
              <Link href="/account">My Account</Link>
              <Link href="/favoriler">Favorilerim</Link>
              <Link href="/sepetim">Sepetim</Link>
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-white hover:bg-black hover:text-white   w-[120px] rounded-full p-2 hover:opacity-80"
              >
                çıkış yap
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              className=" bg-white hover:bg-black hover:text-white py-2 px-4 rounded-full"
              href="/login"
            >
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
