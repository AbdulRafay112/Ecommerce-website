"use client";
import { ProductContext } from "@/app/context";
import { useContext } from "react";
import type { product } from "@/app/types/product";
import Link from "next/link";

const Cart = () => {
  const { cart, deleteToCart, setCart , cartTotal } = useContext(ProductContext);

  const clearCart = () => {
    setCart([]);
  };
  if (cart.length === 0) {
    return (
      <>
        <div className="text-center text-red-500 text-lg">
          No Item in the Cart
        </div>
      </>
    );
  }

  return (
    <div className="max-w-[70%] mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 pb-2">Item</th>
            <th className="border-b-2 border-gray-300 pb-2">Price</th>
            <th className="border-b-2 border-gray-300 pb-2">Quantity</th>
            <th className="border-b-2 border-gray-300 pb-2">SubTotal</th>
            <th className="border-b-2 border-gray-300 pb-2">Remove</th>
          </tr>
        </thead>
        <tbody className="pt-2">
          {cart.map((product: product, index: number) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3">{product.name || "Product Name"}</td>
              <td className="py-3">Rs{product.price || 0}</td>
              <td className="py-3">{product.count || 1}</td>
              <td className="py-3">
                Rs{(product.price || 0) * (product.count || 1)}
              </td>
              <td className="py-3">
                <button
                  className="text-red-500"
                  onClick={() => deleteToCart(product)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons flex justify-between mt-4">
        <Link href={"/product"}>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">
            Continue Shopping
          </button>
        </Link>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
      <div className="flex justify-end">
        <div className="box text-center py-5 px-2 bg-slate-200 w-[200px] rounded-md mt-5">
          <div className="mb-2">SubTotal: <b>Rs{cartTotal}</b></div>
          <div className="border-b-2 border-black mb-2">Shipping Fee : <b>Rs0</b></div>
          <div>Order Total : <b>Rs{cartTotal}</b></div>
          <Link href={'/checkout'}><button className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4">Check Out</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
