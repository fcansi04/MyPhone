"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const admin = () => {
  const [Product, setProduct] = useState({
    image:
      "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg",
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
    </form>
  );
};

export default admin;
