"use client";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Feed = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/product");
      const data = await response.json();
      const n = data.length;

      for (let i = 0; i < Math.floor(n / 2); i++) {
        const prev = data[i];
        data[i] = data[n - i - 1];
        data[n - i - 1] = prev;
      }
      setProducts(data);
      setAllProducts(data);
    };
    fetchProduct();
  }, []);

  const handleSingleProduct = async (e) => {
    const productid = e.currentTarget.getAttribute("product_id");
    const response = await fetch(`/api/singleProduct/${productid}`);
    const data = await response.json();

    router.push(
      `/singlePage/${productid}/product?data=${JSON.stringify(data)}`
    );
  };

  return (
    <div className="flex gap-40 mt-52 max-md:flex-col">
      <Filter
        products={products}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        setProducts={setProducts}
        className="w-[120px]  "
      ></Filter>
      <div className="justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-10  gap-y-24 mx-auto ">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              product_id={product._id}
              className=" relative w-[280px]  rounded-xl h-[30rem] flex flex-col items-start justify-start cursor-pointer shadow-md  "
              onClick={handleSingleProduct}
            >
              <div className="w-full flex justify-center items-center bg-gray-100  shadow  h-[15rem]">
                <Image
                  width={150}
                  height={150}
                  alt="image-product"
                  src={product.image}
                  className=" rounded-lg"
                ></Image>
              </div>
              <div className="w-full h-[15rem] p-2 ">
                <p className="font-bold leading-none mt-4 text-[19px] h-[2rem] mb-2 ">
                  {product.name}
                </p>
                <p className="break-all h-[4rem]">{product.description}</p>
                <div className="flex items-end justify-between self-end">
                  <h1 className="ml-1 mt-10 textOrangeOp font-semibold text-xl ">
                    {product.price}{" "}
                  </h1>
                  <button className="bg-gray-900 p-2 rounded-md text-white">
                    detaylı bilgi
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
