import {product} from "@/app/types/product"
interface ProductState {
  isLoading: boolean;
  isError: boolean;
  products: product[];
  featureProducts: product[];
}

type ProductAction =
  | { type: "SET_API_DATA"; payload: product[] }
  | { type: "API_ERROR" };

const ProductReducer = (state:ProductState, action:ProductAction) => {
    switch (action.type) {
      case "SET_API_DATA":
        const featureData = action.payload.filter((product:product) => product.isFeaturedProduct === true)
        return {
          ...state,
          isLoading: false,
          isError: false,
          products: action.payload,
          featureProducts: featureData,
        }
      case "API_ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true,
        }
      default:
        return state
    }
  }
  
  export default ProductReducer
  
  