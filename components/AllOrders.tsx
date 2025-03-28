"use client"
import React, { useContext } from 'react'
import Orders from './Orders'
import { ProductContext } from '@/app/context'
const AllOrders = () => {
    const {customerData} = useContext(ProductContext)
  return (
    <div>
      <Orders data = {customerData}/>
    </div>
  )
}

export default AllOrders
