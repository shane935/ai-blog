import React from "react";

import { faker } from "@faker-js/faker";
import ProductCard from "./components/product";

const createProduct = (id: number) => {
  return {
    id,
    product: faker.commerce.product(),
    volume: faker.number.float({ max: 100, min: 0, precision: 0.01 }),
    cost: faker.commerce.price(),
  };
};

const data = Array.from({ length: 1000 }, (v, id) => createProduct(id));

export default () => {
  return (
    <>
      <h1 className="text-2xl mb-8">Product List</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 product-list">
        {data.slice(0, 19).map((product) => (
          <ProductCard {...product} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <span>&lt;</span>
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <span>&gt;</span>
        </button>
      </div>
    </>
  );
};
