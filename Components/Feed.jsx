"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Feed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/product");
      const data = await response.json();
      setProducts(data);
    };
    fetchProduct();
  }, []);

  return (
    <div className="w-full justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 mt-36">
      {products.map((product) => {
        return (
          <div
            key={product._id}
            className="w-[240px]  rounded-lg h-[460px] flex flex-col items-start justify-center border-[1px] border-gray "
          >
            {" "}
            <div className="w-full bg-white h-[72%]">
              <Image
                width={150}
                height={100}
                alt="image-product"
                src={product.image}
                className="w-full rounded-lg"
              ></Image>
            </div>
            <p className="ml-1 mt-4 text-[14px] text-gray-600">
              {product.description}
            </p>
            <h1 className="ml-1 mt-10 textOrange font-bold">
              {product.price}{" "}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
