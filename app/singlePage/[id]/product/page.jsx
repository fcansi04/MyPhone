"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
const SingleProduct = () => {
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
    <section className="mt-[180px]  flex gap-20 h-[50vh] items-center">
      <div className="w-[800px] h-[320px] flex justify-center items-center bg-gray-100 rounded-lg ">
        <Image width={200} height={20} alt="product" src={product.image} />
      </div>
      <div className="flex flex-col h-[320px] mt-8">
        <h1 className="text-xl font-bold mb-8">{product.name}</h1>
        <h2 className="font-semibold">Desription</h2>
        <p>{product.description} </p>
        <button
          onClick={addToCard}
          className="bg-black text-white lg:w-64 p-3 rounded-lg mt-32"
        >
          Sepete Ekle
        </button>
      </div>
    </section>
  );
};

export default SingleProduct;
