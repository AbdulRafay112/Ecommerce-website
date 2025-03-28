"use client"

import { ProductContext } from "@/app/context"
import { useContext } from "react"
import Orders from "./Orders"
const PendingOrders = () => {
    const {customerData} = useContext(ProductContext)
    const pendingCustomerData = customerData.filter((customer)=>customer.orderStatus == "pending")
  return (
    <>
    <Orders data = {pendingCustomerData}/>
    
    </>

  )
}

export default PendingOrders
