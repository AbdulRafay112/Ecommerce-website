"use client";
import { product } from "@/app/types/product";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Productlisting = ({products}:{products:product[]}) => {

  return (
    <>
      {products.map((product:product , index:number)=>{
        return(<>
        <Link href={`/products/${product.name}`}>
        <div key={index} className="relative border mt-4 py-3">
          <div>
          <figure className="relative h-64 w-[50%] mt-8">
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
          </div>
          <div className="absolute top-14 left-96">
            <div className="text-2xl font-bold">{product.name}</div>
            <div className="font-bold text-xl mt-4">Rs{product.price}</div>
            <div className="mt-2">{product.description}</div>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg mt-3">Read More</button>
          </div>
        </div>
        </Link>
        </>)
      })}
    </>
  );
};

export default Productlisting;
