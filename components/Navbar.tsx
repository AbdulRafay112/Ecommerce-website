"use client"

import { useState , useContext, useEffect} from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { ProductContext } from "@/app/context"
import { LogOutAction } from "@/app/actions/logoutaction"
import { GetToken } from "./GetToken"
const Menuitems = () => {
const [token, setToken] = useState({})
  const {cart} = useContext(ProductContext)
const cartProducts = cart.length

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = ()=>{
    LogOutAction()
  }

  const handleToken = async()=>{
    const token = await GetToken()
    if(!token)
      return 
    setToken(token)
  }
useEffect(() => {
  handleToken()
}, [])


  
  

  return (
    
    <nav className="h-[100px] flex items-center justify-between px-8 relative">
      <div className="flex items-center border-2 border-black">
        <span className="bg-blue-700 text-white">Rafay</span> <span className="font-bold">Store</span>
      </div>
      
        <button onClick={toggleMenu} className="z-20 sm:hidden block">
          <Menu size={24} />
        </button>
      <ul
        className="sm:flex hidden items-center gap-4" 
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/product">Products</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          {!token && <Link href={'/signin'}><button className="bg-blue-700 text-white px-3 py-1">Login</button></Link>}
          {token && <button className="bg-blue-700 text-white px-3 py-1" onClick={handleLogout}>Logout</button>}
        </li>
        <Link href={'/cart'}>
        <li className="cart relative">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color="#000000"
              fill="none"
            >
              <path
                d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M6 6H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="6" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 20L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path
                d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="absolute bg-blue-700 text-white rounded-full px-1 bottom-4 left-4">{cartProducts}</span>
        </li>
        </Link>
      </ul>
      { isMenuOpen &&<ul
        className="flex items-center gap-4 flex-col absolute top-full left-0 w-full bg-white z-10 py-4 shadow-md sm:hidden" 
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/product">Products</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          {!token && <Link href={'/signin'}><button className="bg-blue-700 text-white px-3 py-1">Login</button></Link>}
          {token && <button className="bg-blue-700 text-white px-3 py-1" onClick={handleLogout}>Logout</button> }
        </li>
        <Link href={'/cart'}>
        <li className="cart relative">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color="#000000"
              fill="none"
            >
              <path
                d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M6 6H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="6" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 20L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path
                d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="absolute bg-blue-700 text-white rounded-full px-1 bottom-4 left-4">{cartProducts}</span>
        </li>
        </Link>
      </ul>
      }
    </nav>
  )
}

export default Menuitems




