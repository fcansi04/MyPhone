"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
const ProductDetails = () => {
  const searchParams = useSearchParams();
  const productData = searchParams.get("data");
  const { data: session } = useSession();
  const router = useRouter();

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

  const addToCard = async () => {
    if (!session) {
      router.push("/login");
    } else {
      const productID = product._id;
      await fetch("/api/cards", {
        method: "POST",
        body: JSON.stringify({ productID: productID, quantity: 1 }),
      });
    }
  };

  return (
    <section className="mt-[180px]  flex lg:gap-20  items-center max-lg:flex-col ">
      <div className="w-[400px] py-10  flex justify-center items-center bg-gray-100 rounded-lg ">
        <Image width={200} height={20} alt="product" src={product.image} />
      </div>
      <div className="flex flex-col  mt-8 w-[400px] ">
        <h1 className="text-xl font-bold lg:mb-6 mb-2">{product.name}</h1>
        <h1 className="font-semibold text-lg textOrangeOp mb-4 lg:mb-10">
          {product.price}
        </h1>
        <h2 className="font-semibold">Açıklama:</h2>
        <p>{product.description} </p>
        <div className="flex justify-between lg:gap-5">
          <button
            onClick={addToCard}
            className="bg-black text-white lg:w-64 p-3 rounded-lg mt-5 lg:mt-20 hover:opacity-85"
          >
            Sepete Ekle
          </button>
          <Link
            href="/sepetim"
            className="bgOrangeOp text-white text-center lg:w-64 p-3 rounded-lg mt-5 lg:mt-20"
          >
            {" "}
            Sepete Git
          </Link>
        </div>
      </div>
    </section>
  );
};

const SingleProduct = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  );
};

export default SingleProduct;
