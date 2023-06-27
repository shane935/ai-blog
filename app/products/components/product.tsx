import React from "react";

interface ProductProps {
  product: string;
  volume: number;
  cost: string;
}

const ProductCard: React.FC<ProductProps> = ({ product, volume, cost }) => {
  return (
    <div className="card shadow-md p-4 product">
      <h2 className="text-lg product-name">{product}</h2>
      <p className="product-volume">Volume: {volume}</p>
      <p className="product-cost">Cost: ${cost}</p>
    </div>
  );
};

export default ProductCard;
