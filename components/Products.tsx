"use client"
import { useState , useContext , useEffect } from "react"
import { ProductContext } from "@/app/context"
import SeekBar from "./Seekbar"
import Productlisting from "./Productlisting"
import ProductGrid from "./ProductGrid"
import Productsort from "./Productsort"
import { product } from "@/app/types/product"
const Products = () => {
    const [gridViewOpen, setGridViewOpen] = useState(true)
    const [allProducts, setAllProducts] = useState<product[]>([])

     const { products, isLoading } = useContext(ProductContext)
    useEffect(() => {
      setAllProducts(products)
    }, [products])
  
    // function for getting Category Data 
    const getCategoryData = (category:string)=>{
      if(category != "All"){
      const sofaData = products.filter((product:product)=>product.category == category)
      setAllProducts(sofaData)
      }
      else 
        setAllProducts(products)
    }

      if (isLoading)
        return (
          <>
            <div>Loading...</div>
          </>
        );

  return (
    <>
      <div className='max-w-[80%] mx-auto flex gap-5'>
        <div className="left h-[1000px] w-[30%] flex flex-col px-3 gap-6">
            <div className='mt-6'><input type="text" placeholder='search' className='border py-2 rounded-md px-2' /></div>
            <div className='category'>
                <div className='text-xl font-bold'>Category</div>
                <ul className='flex flex-col gap-3 mt-3'>
                    <li  onClick={()=>getCategoryData("All")}><button>All</button></li>
                    <li  onClick={()=>getCategoryData("Sofa")}><button>Sofa</button></li>
                    <li  onClick={()=>getCategoryData("Table")}><button>Table</button></li>
                    <li  onClick={()=>getCategoryData("Bed")}><button>Bed</button></li>
                    <li  onClick={()=>getCategoryData("Chair")}><button>Chair</button></li>
                </ul>
            </div>
            <div>
                <div className='font-bold text-xl'>Company</div>
                <select name="company" id="company" className='border px-2 cursor-pointer mt-3'>
                    <option value="All">All</option>
                    <option value="Private">Private</option>
                </select>
            </div>
            <div className='price'>
                <div className='text-xl font-bold'>Price</div>
                <div className="seekbar"><SeekBar/></div>
            </div>
            <button className="bg-blue-700 text-white px-3 py-1 rounded-lg">Clear Filter</button>
        </div>
        <div className="right flex-1 min-h-[1000px]">
            <Productsort gridViewOpen = {gridViewOpen} setGridViewOpen = {setGridViewOpen} products = {allProducts} setProducts = {setAllProducts}/>
            {gridViewOpen && <ProductGrid products = {allProducts}/>}
            {gridViewOpen == false && <Productlisting products = {allProducts}/>}
        </div>
    </div>
    </>
  )
}

export default Products
