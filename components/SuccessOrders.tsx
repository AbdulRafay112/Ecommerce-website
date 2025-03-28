"use client"

import { ProductContext } from "@/app/context"
import { useContext } from "react"
import Orders from "./Orders"
const SuccessOrders = () => {
    const {customerData} = useContext(ProductContext)
    const successCustomerData = customerData.filter((customer)=>customer.orderStatus == "completed")
  return (
    <>
    <Orders data = {successCustomerData}/>
    
    </>

  )
}

export default SuccessOrders
