"use client"
import { ProductContext } from '@/app/context'
import { product } from '@/app/types/product'
import React,{useState}  from 'react'
import {FaMinus , FaPlus} from "react-icons/fa"
import Image from 'next/image'
import { FaTruck } from "react-icons/fa";
import { useContext } from 'react'
import { FaArrowsUpDownLeftRight } from "react-icons/fa6";
import { FaShieldVirus } from "react-icons/fa";

const Singlepage = ({productName}:{productName:string}) => {
  const [productCount, setProductCount] = useState(1)

    const {products , isLoading, setCart} = useContext(ProductContext)
    const productArray = products.filter((product:product)=>product.name == productName)  

     // functionality for add to cart 
  const addToCart = (product:product)=>{
    setCart((prevCart)=>{
      const existingProductIndex = prevCart.findIndex((item:product)=>item._id === product._id)
      if(existingProductIndex !== -1){
        const updatedCart = [...prevCart]
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          count:(updatedCart[existingProductIndex].count || 1) + productCount,
        }
        return updatedCart
      }
      else{
        return[...prevCart , {...product , count:productCount , subTotal:product.price * productCount}]
      }

    })
  }
  
    // function for increment productCount
    const handleIncrement = ()=>{
      setProductCount(productCount+1)
    }
    // function for decrement productCount
    const handleDecrement = ()=>{
      if(productCount>1)
        setProductCount(productCount-1)
    }

    if(isLoading)
        return(<><div>Loading....</div></>)
  return (
   <>
   <div>
   {productArray.map((product:product , index:number)=>{
    return(<><div key={index}>
      <div className='px-3'>Home/<span className='font-bold'>{product.name}</span></div>
      <div className='max-w-[80%] mx-auto min-h-[600px] flex lg:justify-between justify-center items-center gap-7 flex-wrap mt-6'>
        <div className="left">
          <Image src={product.imagePath} alt='image' width={400} height={400}></Image>
        </div>
        <div className="right flex flex-col gap-6 justify-center">
          <div className='text-2xl font-bold'>{product.name}</div>
          <div>Rs {product.price}</div>
          <div>{product.description}</div>
          <div className='flex items-center gap-5'>
            <div className='flex flex-col items-center justify-center'>
              <FaTruck/>
              <div>Free Delivery</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <FaArrowsUpDownLeftRight />
              <div>30 Days Replacement</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <FaShieldVirus/>
              <div>2 years warranty</div>
            </div>
          </div>
            <hr className='border w-full '/>
          <div>Avaliable: {product.stockLevel ? "In stock":"out of stock"}</div>
          <div>ID:{product._id}</div>
          <hr className='border-2 border-black w-full' />
          <div className='flex items-center gap-3 justify-center'>
            { product.stockLevel>productCount &&  <button onClick={handleIncrement}><FaPlus/></button>}
            { product.stockLevel<=productCount &&  <button><FaPlus/></button>}
            <span className='font-bold text-xl'>{productCount}</span>
            <button onClick={handleDecrement}><FaMinus/></button>
          </div>
          <button className='bg-blue-800 text-white rounded-lg px-3 py-2' onClick={()=>addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
    </>)
   })}
   </div>
  
   </>
  )
}

export default Singlepage
