// context.ts - Updated version
"use client"
import { createContext, Dispatch, SetStateAction } from "react"
import { product } from "@/app/types/product"

// Import the Customer interface or define it here
export interface Customer {
  _id: string;
  orderStatus: string;
  firstname: string;
  lastname: string;
  streetaddress: string;
  _updatedAt: string;
  // Add any other properties your customer objects have
}


// Define the complete context type
interface ProductContextType {
  isLoading?: boolean;
  isError?: boolean;
  products: product[];
  featureProducts: product[];
  cart: product[];
  setCart: Dispatch<SetStateAction<product[]>>;
  deleteToCart: (product: product) => void;
  cartTotal: number;
  total: number;
  customerData: Customer[];
  setCustomerData: Dispatch<SetStateAction<Customer[]>>;
}

// Create the context with proper typing
export const ProductContext = createContext<ProductContextType>({} as ProductContextType);