import Link from "next/link";
import React from "react";

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
  { id: 4, name: "Product 4" },
];

const page = () => {
  return (
    <div className="flex gap-3 flex-col">
      {products.map((product, i) => (
        <div className="bg-gray-200">
          <div>{product.name}</div>
          <Link href={`products/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default page;
