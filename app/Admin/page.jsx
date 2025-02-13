"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
const admin = () => {
  const { data: session } = useSession();
  const [Product, setProduct] = useState({
    name: "",
    image: "https://m.media-amazon.com/images/I/61nEkHocR8L._AC_SL1500_.jpg",
    description: "",
    price: "",
  });

  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product/new", {
        method: "POST",
        body: JSON.stringify({
          name: Product.name,
          image: Product.image,
          description: Product.description,
          price: Product.price,
        }),
      });
      if (response.ok) router.push("/");
    } catch (error) {
      console.log(error, "create prompt api error!!");
    }
  };
  return (
    <form onSubmit={createProduct} className="flex flex-col mt-20">
      <Image
        width={100}
        height={100}
        alt="phone image  "
        src="/images/Apple-image.jpg"
      ></Image>
      <label>
        <h1>telefon ismi küçük detay</h1>
        <textarea
          value={Product.name}
          onChange={(e) => {
            setProduct({ ...Product, name: e.target.value });
          }}
          required
        ></textarea>
      </label>
      <label className="mt-10">
        <h1>açıklama</h1>
        <textarea
          value={Product.description}
          onChange={(e) => {
            setProduct({ ...Product, description: e.target.value });
          }}
          className="bg-gray-100 w-[400px] p-4"
          name=""
          id=""
          required
        ></textarea>
      </label>
      <label className="mt-10">
        <h1>fiyat</h1>
        <input
          value={Product.price}
          onChange={(e) => {
            setProduct({ ...Product, price: e.target.value });
          }}
          type="text"
          className="w-400px bg-gray-100 p-4"
          required
        />
      </label>
      <button type="submit" className="w-20 mt-10 bgOrange">
        oluştur
      </button>
      <Link
        className="mt-10 bg-green-600 w-20 p-4 rounded-full"
        href="/deleteProducts"
      >
        Delete
      </Link>
    </form>
  );
};

export default admin;
