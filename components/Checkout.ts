import {product} from "@/app/types/product"
import {customerinfo} from "@/app/types/customerinfo"
import { client } from "@/sanity/lib/client"

// create customer in sanity
const createCustomerInSanity = async(customerinfo:customerinfo)=>
    {
       try{
        const customerObj = {
            _type:"customer",
            firstname:customerinfo.firstname,
            lastname:customerinfo.lastname,
            email:customerinfo.emailaddress,
            streetaddress:customerinfo.streetaddress,
            country:customerinfo.country,
            selectedPayment:customerinfo.selectedpayment,
            companyname:customerinfo.companyname,
            orderStatus:"dispatch"
        }
        
            const response = await client.create(customerObj)
            console.log(response , "customer successfully created")
            return response
       }
        catch(error){
            console.log(error)
            throw error
        }

    }

    // create order in sanity 
    const createOrderInSanity = async(cart:product[] , customer_id:string)=>
        {
            try{
                const orderObject = {
                    _type:"order",
                    customer:{
                        _type:"reference",
                        _ref:customer_id
                    },
                    items:cart.map((item:product)=>({
                        _type:"items",
                        _id:item._id,
                        product_name:item.name,
                        quantity:item.count,
                    })),
                    order_date : new Date().toISOString(),
                }
                const response = await client.create(orderObject)
                console.log("order successfully created in sanity" , response)
                return response

            }
            catch(error){
                console.log(error)
            }

        }


export const Checkout = async(cart:product[] , customerInfo:customerinfo)=>{
   try{
    const customer = await createCustomerInSanity(customerInfo) 
    await createOrderInSanity(cart , customer._id)
   }
   catch(error){
    console.log(error)
    console.log("error while creating cutomer and creating order in sanity ")
   }
}