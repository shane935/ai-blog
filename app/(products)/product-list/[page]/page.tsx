import React, { FunctionComponent } from "react";

import { faker } from "@faker-js/faker";
import ProductCard from "../../components/product";
import Link from "next/link";

const PAGE_SIZE = 20;

const createProduct = (id: number) => {
  return {
    id,
    product: faker.commerce.product(),
    volume: faker.number.float({ max: 100, min: 0, precision: 0.01 }),
    cost: faker.commerce.price(),
  };
};

const data = Array.from({ length: 1000 }, (v, id) => createProduct(id));

function paginate(array: typeof data, page_size: number, page_number: number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const ProductList: FunctionComponent<{ params: { page: string } }> = ({
  params: { page },
}) => {
  const pageNum = parseInt(page);

  const lastPage = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = paginate(data, PAGE_SIZE, pageNum);

  return (
    <>
      <h1 className="text-2xl mb-8">Product List</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 product-list">
        {paginatedData.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {pageNum > 1 && (
          <Link
            href={`/product-list/${pageNum - 1}`}
            className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded left-arrow"
          >
            <span>&lt;</span>
          </Link>
        )}
        {pageNum < lastPage && (
          <Link
            href={`/product-list/${pageNum + 1}`}
            className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded right-arrow"
          >
            <span>&gt;</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default ProductList;
