"use client";
import React from "react";
import { product } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";

const ProductGrid = ({products}:{products:product[]}) => {
 
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {products.map((product: product, index: number) => {
          return (
            <>
            <Link href={`/products/${product.name}`}>
              <div className="item flex flex-col gap-3" key={index}>
                <figure className="relative h-64 w-full">
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <figcaption className="caption bg-white text-center w-[50px] rounded-lg absolute top-2 right-2">
                    {product.category}
                  </figcaption>
                </figure>
                <div className="flex justify-between">
                  <div className="truncate w-[100px]">{product.name}</div>
                  <div>Rs{product.price}</div>
                </div>
              </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductGrid;
