"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
const SingleProduct = () => {
  const searchParams = useSearchParams();
  const productData = searchParams.get("data");

  // productData'nin varlığını ve geçerliliğini kontrol et
  if (!productData) {
    return <div className="text-2xl">Ürün verisi bulunamadı.</div>;
  }

  let product;
  try {
    product = JSON.parse(productData);
  } catch (error) {
    console.error("JSON parse hatası:", error);
    return <div className="text-2xl">Geçersiz ürün verisi.</div>;
  }

  return (
    <section className="mt-[180px] border-2 flex h-[70vh]">
      <div className="w-[300px] h-[320px] flex justify-center items-center bg-gray-100 rounded-lg">
        <Image width={200} height={20} alt="product" src={product.image} />
      </div>
      <div>
        <h1>{product.description}</h1>
      </div>
    </section>
  );
};

export default SingleProduct;
