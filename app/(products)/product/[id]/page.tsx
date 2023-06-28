import React, { FunctionComponent } from "react";

const ProductDetail: FunctionComponent<{ params: { id: number } }> = ({
  params: { id },
}) => (
  <div className="product-detail">
    <h1>Product {id}</h1>
  </div>
);

export default ProductDetail;
