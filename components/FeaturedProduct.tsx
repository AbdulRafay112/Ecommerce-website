"use client"
import { ProductContext } from "@/app/context"
import { useContext } from "react"
import type { product } from "@/app/types/product"
import Image from "next/image"
import Link from "next/link"

const FeaturedProduct = () => {
  const { featureProducts, isLoading } = useContext(ProductContext)

  if (isLoading) return <div>Loading...</div>

  return (
    <>
    <div className="flex flex-col items-center justify-center bg-slate-300 gap-8 min-h-[800px] ">
      <div className="text-xl font-bold">Check Now</div>
      <div className="text-3xl font-bold">Our Feature Services</div>
      <div className="flex flex-wrap justify-center gap-3">
      {featureProducts.map((product: product, index: number) => {
        return (
          <>
          <Link href={`/products/${product.name}`}>
          <div key={index} className="flex flex-col items-center justify-center relative cursor-pointer">
              <figure className="relative h-64 w-full">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <figcaption className="caption bg-white text-center w-[50px] rounded-lg absolute top-2 right-2">{product.category}</figcaption>
              </figure>
                <div>{product.name}</div>
                <div>Rs{product.price}</div>
          </div>
          </Link>
          </>
        )
      })}
      </div>
    </div>
    </>
  )
}

export default FeaturedProduct


