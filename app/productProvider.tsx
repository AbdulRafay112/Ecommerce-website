"use client"
import type React from "react"
import { useEffect, useReducer, useCallback , useState } from "react"
import { ProductContext } from "./context"
import { client } from "@/sanity/lib/client"
import reducer from "@/app/reducer/productReducer"
import {product} from "@/app/types/product"
import { Customer } from "@/components/Orders"
const ProductProvider = ({children}:{children:React.ReactNode}) => {
  const [customerData, setCustomerData] = useState<Customer[]>([])
  const [cart, setCart] = useState<product[]>(()=>{
    if(typeof window !== "undefined"){
      const savedCart = localStorage.getItem("cart")
      if(savedCart && savedCart !== "undefined")
      {
        try{
          return JSON.parse(savedCart)
        }
        catch(error){
          console.log(error)
          return[]
        }
      }
    }
    return[]
  })

  // code for calculating subtotal of the cart
  const cartTotal = cart.reduce((acc , currVal)=>{
    return acc + currVal.subTotal
  } , 0)
  const total = (cartTotal/300) * 100 // amount in cents 
  
// function for delete product in the cart
const deleteToCart = (product:product)=>{
  const updatedCart = cart.filter((item)=>item._id !== product._id)
  setCart(updatedCart)
}
 // save cart to local storage 
   useEffect(() => {
     if(typeof window !== "undefined")
      localStorage.setItem("cart" , JSON.stringify(cart))
   }, [cart])


  // initial state for useReducer hook
  const initialState = {
    isLoading: true,
    isError: false,
    products: [],
    featureProducts: [],
  }

// use reducer hook
  const [state, dispatch] = useReducer(reducer, initialState)

  // function for get featured data
  const getFeaturedData = useCallback(async () => {
    try {
      const products = await client.fetch(`*[_type == "product"]{
        name,
        price,
        description,
        imagePath,
        category,
        stockLevel,
        discountPercentage,
        isFeaturedProduct,
        _id
      }`)
      dispatch({ type: "SET_API_DATA", payload: products })
    } catch (error) {
      console.log(error)
      dispatch({ type: "API_ERROR" })
    }
  }, [])


  // use Effect functionality
  useEffect(() => {
    getFeaturedData()
  }, [getFeaturedData])


    // function for getting customers data
   useEffect(() => {
    const getCustomerData = async()=>{
      const data = await client.fetch(`*[_type=="customer"]`)
      setCustomerData(data)
  }
  getCustomerData()
   }, [])

  // return
  return <ProductContext.Provider value={{...state , cart , setCart , deleteToCart , cartTotal , total , customerData , setCustomerData}}>
    {children}
    </ProductContext.Provider>
}

export default ProductProvider



