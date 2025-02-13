import Product from "@/models/product";
import React, { useState } from "react";

const Filter = ({ products, setProducts, allProducts, setAllProducts }) => {
  const handleKategori = (e) => {
    const selected = e.target.value;

    let selectedProducts = allProducts.filter((Product) => {
      return Product.description.includes(selected);
    });
    setProducts(selectedProducts);
  };

  return (
    <div>
      <div className="font-semibold text-xl mb-4 max-md:text-center">
        Product Categories
      </div>
      <ul className="flex gap-4  text-lg flex-col max-md:flex-row bg-gray-900 textOrangeOp rounded-lg p-5 h-68 justify-start max-md:justify-center font-semibold">
        <li className="hover:text-xl">
          <span className="font-bold max-md:hidden ">{"->"}</span>
          <button
            onClick={() => {
              setProducts(allProducts);
            }}
          >
            Show ALL
          </button>
        </li>
        <li className="hover:text-xl">
          <span className="font-bold max-md:hidden">{"->"}</span>
          <button onClick={handleKategori} value="iphone">
            Apple
          </button>
        </li>
        <li className="hover:text-xl">
          <span className="font-bold max-md:hidden">{"->"}</span>
          <button onClick={handleKategori} value="samsung">
            Samsung
          </button>
        </li>
        <li className="hover:text-xl">
          <span className="font-bold max-md:hidden">{"->"}</span>
          <button onClick={handleKategori} value="xiaomi">
            Xiaomi
          </button>
        </li>{" "}
        <li className="hover:text-xl">
          <span className="font-bold max-md:hidden">{"->"}</span>
          <button onClick={handleKategori} value="tablet">
            Tablet
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
