"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Sepetim = () => {
  const { data: session, status } = useSession();
  const [cardProducts, setcardProducts] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const fetchProductsInCards = async () => {
        try {
          const response = await fetch(`/api/cardsProduct/${session?.user.id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setcardProducts(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProductsInCards();
    }
  }, [session, status]);

  console.log(cardProducts);
  return (
    <section className="mt-[180px] xl:mx-20 w-full">
      <h1>Sepetim</h1>{" "}
      <div className=" ">
        <div>
          <div>
            <ul className="flex gap-[30rem]">
              <li>Ürünler</li>
            </ul>
          </div>
          <div className="w-[1000px]">
            {cardProducts.map((item) => {
              return (
                item?.product && (
                  <div key={item.product._id} className="flex gap-5">
                    <Image
                      width={50}
                      height={50}
                      alt="image"
                      src={item.product.image}
                    />
                    <div>
                      <h1 className="font-bold w-[200px ]">
                        {item.product.name}
                      </h1>
                      <h2 className="font-semibold">{item.product.price} </h2>
                    </div>
                    <div className="border-2 rounded-lg  h-[40px] flex gap-4 justify-center items-center">
                      <span className="text-3xl cursor-pointer">-</span>
                      <input className="w-[20px] text-center" type="text" />
                      <span className="text-2xl cursor-pointer">+</span>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className=""></div>
      </div>
    </section>
  );
};

export default Sepetim;
