"use client"

import { client } from "@/sanity/lib/client"
import { useState, useEffect } from "react"
interface Data {
  _id:string;
  customerRef:string;
  items:[]
}
interface Order{
  items:[]
}
interface Item{
  quantity:number;
  product_name:string
}
// Component to display order details
export const OrderDetails = ({ customerId }: { customerId: string }) => {
  const [orderData, setOrderData] = useState([])
  useEffect(() => {
    const getOrder = async () => {
      const orderData = await client.fetch(`*[_type == "order"]{ 
          _id,
          "customerRef": customer._ref,
            items
        }`)
      const filterData = orderData.filter((data:Data) => data.customerRef == customerId)
      setOrderData(filterData)
    }
    getOrder()
  }, [customerId])

  return (
    <>
      <div className="p-2">
        <h3 className="font-bold text-lg mb-2">Order Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderData.length > 0 &&
                orderData.map(
                  (order:Order) =>
                    // Check if order has items and items is an array
                    order.items &&
                    Array.isArray(order.items) &&
                    order.items.map((item:Item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{item.product_name}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                      </tr>
                    )),
                )}
              {orderData.length === 0 && (
                <tr>
                  <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

