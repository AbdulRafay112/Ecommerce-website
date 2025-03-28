"use client"
import { product } from '@/app/types/product';
import { Dispatch , SetStateAction } from 'react';
import React, { useEffect, useState } from 'react'
import { FaBars, FaTh } from 'react-icons/fa';
const Productsort = ({gridViewOpen , setGridViewOpen , products , setProducts}:{gridViewOpen : boolean , setGridViewOpen: Dispatch<SetStateAction<boolean>> , products:product[] , setProducts: Dispatch<SetStateAction<product[]>>}) => {
  // states for getting selected option 
  const [selectedOption, setSelectedOption] = useState("pricelowest")
  // function for handle change 
  const handleOptionChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedOption(e.target.value)
  }

  // code for filtering price 
  useEffect(() => {
    const sortedProducts = [...products]; // Create a copy of the products array

    if (selectedOption == "pricelowest") {
      sortedProducts.sort((a: product, b: product) => a.price - b.price);
    } else if (selectedOption == "pricehighest") {
      sortedProducts.sort((a: product, b: product) => b.price - a.price);
    }
    
    setProducts(sortedProducts); // Update the state with the new sorted array
  }, [selectedOption, setProducts , products]);
  
 
  return (
    <div className='flex items-center justify-between h-[100px]'>
        <div className='flex gap-3 cursor-pointer'>
            <button className={`${gridViewOpen == true ? "border-2 border-black" :""}`} onClick={()=>setGridViewOpen(true)}><FaTh/></button>
            <button className={`${gridViewOpen == false ? "border-2 border-black" :""}`}  onClick={()=>setGridViewOpen(false)}><FaBars/></button>
        </div>
        <div>{products.length}</div>
        <div>
            <select name="price-range" id="price-range" className='border cursor-pointer' value={selectedOption} onChange={handleOptionChange}>
                <option value="pricelowest">pricelowest</option>
                <option value="pricehighest">pricehighest</option>
            </select>
        </div>
    </div>
  )
}

export default Productsort
