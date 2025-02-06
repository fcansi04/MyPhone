"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { data: session } = useSession();
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProvider();
  }, []);

  console.log(session?.user);
  return (
    <section className=" flex w-full gap-20 justify-between items-center mt-8">
      <Link href="/" className="font-bold">
        BelsaGSM
      </Link>
      <form action="submit" className="w-[70%] relative">
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
      <nav className="flex items-center gap-8 w-[400px] ">
        {session?.user ? (
          <button
            onClick={() => {
              signOut();
            }}
            className="bgOrange rounded-full p-2 hover:opacity-80"
          >
            çıkış yap
          </button>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="bgOrange rounded-full p-2 hover:opacity-80"
                  >
                    Giriş Yap
                  </button>
                );
              })}{" "}
          </>
        )}

        <Link href="/favoriler">Favorilerim</Link>
        <Link href="sepetim">Sepetim</Link>
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
