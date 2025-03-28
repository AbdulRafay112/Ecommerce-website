"use client"

import { ProductContext } from "@/app/context"
import { useContext } from "react"
import Orders from "./Orders"
const DispatchOrders = () => {
    const {customerData} = useContext(ProductContext)
    const dispatchCustomerData = customerData.filter((customer)=>customer.orderStatus == "dispatch")
  return (
    <>
    <Orders data = {dispatchCustomerData}/>
    
    </>

  )
}

export default DispatchOrders
