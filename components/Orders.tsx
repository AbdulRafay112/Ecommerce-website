"use client"
import { useContext, useState } from "react"
import { deleteOrder } from "@/app/actions/deleteordersanity"
import { ProductContext } from "@/app/context"
import { OrderDetails } from "./OrderDetails"
export interface Customer {
  _id: string;
  orderStatus: string;
  firstname: string;
  lastname: string;
  streetaddress: string;
  _updatedAt: string;
}
// Add a new function to update order status in Sanity
const updateOrderStatus = async (customerId: string, newOrderStatus: string) => {
  try {
    const response = await fetch("/api/update-order-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId, newOrderStatus }),
    })

    if (!response.ok) {
      throw new Error("Failed to update status")
    }

    return true
  } catch (error) {
    console.error("Error updating order status:", error)
    return false
  }
}

const Orders = ({ data }:{data:Customer[]}) => {
  const { customerData, setCustomerData } = useContext(ProductContext)
  // Add state to track which customer's details are being shown
  const [expandedCustomerId, setExpandedCustomerId] = useState("")

  const handleChange = async (customerId: string, newOrderStatus: string) => {
    // Update local state
    const updatedData = customerData.map((customer:Customer) => {
      if (customer._id === customerId) {
        return {
          ...customer,
          orderStatus: newOrderStatus,
        }
      }
      return customer
    })
    setCustomerData(updatedData)

    // Update in Sanity
    await updateOrderStatus(customerId, newOrderStatus)
  }

  // Toggle expanded customer details
  const toggleCustomerDetails = (customerId: string) => {
    if (expandedCustomerId === customerId) {
      setExpandedCustomerId("") // Close if already open
    } else {
      setExpandedCustomerId(customerId) // Open if closed
    }
  }

  return (
    <>
      <div className="text-center text-3xl font-bold text-black mt-6">Orders</div>
      <div>
        <table className="w-full mt-6">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 pb-2">ID</th>
              <th className="border-b-2 border-gray-300 pb-2">Customer</th>
              <th className="border-b-2 border-gray-300 pb-2">Address</th>
              <th className="border-b-2 border-gray-300 pb-2">Date</th>
              <th className="border-b-2 border-gray-300 pb-2">Status</th>
              <th className="border-b-2 border-gray-300 pb-2">Action</th>
            </tr>
          </thead>
          <tbody className="pt-2">
            {data.map((customer:Customer, index: number) => {
              const dateString = customer._updatedAt
              const date = new Date(dateString)
              const month = date.getUTCMonth() + 1
              const day = date.getUTCDate()
              const year = date.getUTCFullYear()
              const formattedDate = `${month}/${day}/${year}`

              return (
                <>
                  <tr key={`customer-${index}`} className="border-b border-gray-200">
                    <td
                      className="py-3 text-center cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={() => toggleCustomerDetails(customer._id)}
                    >
                      {customer._id}
                    </td>
                    <td className="py-3 text-center">
                      {customer.firstname} {customer.lastname}
                    </td>
                    <td className="py-3 text-center">{customer.streetaddress}</td>
                    <td className="py-3 text-center">{formattedDate}</td>
                    <td className="py-3 text-center">
                      <select
                        name="status"
                        id={`status-${customer._id}`}
                        value={customer.orderStatus || "dispatch"}
                        onChange={(e) => handleChange(customer._id, e.target.value)}
                        className="bg-blue-400 text-white"
                      >
                        <option value="dispatch">Dispatch</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                    <td className="py-3 text-center">
                      <button
                        className="bg-blue-700 text-white px-4 rounded-lg"
                        onClick={() => deleteOrder(customer._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {/* Order details row - shown when customer ID is clicked */}
                  {expandedCustomerId === customer._id && (
                    <tr key={`details-${index}`}>
                      <td colSpan={6} className="bg-gray-50 p-4">
                        <OrderDetails customerId={customer._id} />
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}


export default Orders


