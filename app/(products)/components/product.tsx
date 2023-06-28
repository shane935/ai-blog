import Link from "next/link";
import React from "react";

interface ProductProps {
  id: number;
  product: string;
  volume: number;
  cost: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, product, volume, cost }) => {
  return (
    <Link href={`/product/${id}`}>
      <div className="card shadow-md p-4 product">
        <h2 className="text-lg product-name">{product}</h2>
        <p className="product-volume">Volume: {volume}</p>
        <p className="product-cost">Cost: ${cost}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
