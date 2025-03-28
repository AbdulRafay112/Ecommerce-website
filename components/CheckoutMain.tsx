"use client"
import React, { useContext, useState , useEffect } from "react";
import { product } from "@/app/types/product";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductContext } from "@/app/context";

const CheckoutMain = () => {
  const { cart, cartTotal , setCart } = useContext(ProductContext);
  const [formSubmit, setFormSubmit] = useState(false)
  //state for selected payment
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // state for customer data 
  const [customerInfo, setCustomerInfo] = useState({
    firstname: '',
    lastname: '',
    companyname: '',
    country: '',
    streetaddress: '',
    emailaddress: '',
    selectedpayment: null as string | null
  });

// // function for handleCheckout 
const handleCheckout = async ()=>{
 try{
  const response = await fetch('/api/checkout' , {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({cart , customerInfo})
  })
  if(!response.ok)
    throw new Error("checkout khatam")
    setFormSubmit(true)
    setCart([])
    setCustomerInfo({
    firstname:'',
    lastname:'',
    companyname:'',
    country:'',
    streetaddress:'',
    emailaddress:'',
    selectedpayment:null
  })
 }
 catch(error){
  console.log(error)
 }
}

// use effect hook for selected payment mode value 
useEffect(() => {
  setCustomerInfo((prevInfo)=>({
    ...prevInfo , 
    selectedpayment:selectedPayment
  }))
}, [selectedPayment])


  // function for handle input change 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };
  
// function for handle change 
const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedPayment(e.target.value);
};
  return (
    <>
    <Navbar/>
      <div className="flex gap-7 max-w-[80%] mx-auto">
        <div className="left w-[500px]">
          <div className="font-bold text-2xl">Billing Details</div>
          <form action="/" className="flex flex-col gap-5 mt-5">
            <div className="flex gap-4">
              <div>
                <label htmlFor="firstName">First Name</label> <br />
                <input type="text" className="border py-5 rounded-lg" name="firstname" value={customerInfo.firstname} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label> <br />
                <input type="text" className="border py-5 rounded-lg" name="lastname" value={customerInfo.lastname} onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input type="text" className="border py-5 rounded-lg w-full" name="companyname" value={customerInfo.companyname} onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor="country">Country / Region</label>
              <select
                name="country"
                id="country"
                className="w-full border py-5 rounded-lg cursor-pointer"
                onChange={handleInputChange}
                value={customerInfo.country}
              >
                <option value="pakistan">Pakistan</option>
                <option value="bangladash">bangladash</option>
                <option value="usa">USA</option>
                <option value="afghanistan">Afghanistan</option>
              </select>
            </div>
            <div>
              <label htmlFor="streetAddress">Street Address</label>
              <input type="text" className="border py-5 rounded-lg w-full" value={customerInfo.streetaddress} name="streetaddress" onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="text" className="border py-5 rounded-lg w-full" value={customerInfo.emailaddress} name="emailaddress" onChange={handleInputChange} />
            </div>
          </form>
        </div>
        <div className="right w-[500px]">
          <table className="w-full">
            <thead>
              <tr>
                <th className="font-bold text-xl">Product</th>
                <th className="font-bold text-xl">Sub Total</th>
              </tr>
            </thead>
            {cart.map((item: product, index: number) => {
              return (
                <>
                  <tbody key={index}>
                    <tr>
                      <td className="font-bold">
                        {item.name} X {item.count}
                      </td>
                      <td className="text-end">{item.subTotal}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
          <div className="flex justify-between">
            <div className="font-bold mt-3 text-xl">Total</div>
            <div className="font-bold mt-3 text-xl">Rs{cartTotal}</div>
          </div>
          <hr className="border mt-4" />
          <div>
            <label>
              <input
                type="radio"
                onChange={handlePaymentChange}
                name="payment"
                value="cod"
              />{" "}
              Cash on Delivery (COD)
            </label>{" "}
            <br />
            <label>
              <input
                type="radio"
                onChange={handlePaymentChange}
                name="payment"
                value="online"
              />
              Pay With Stripe
            </label>
          </div>
          {selectedPayment == "cod" && <button className="bg-blue-700 text-white py-2 px-4 rounded-lg" onClick={handleCheckout}>Place Order</button>}
          {selectedPayment == "online" &&<Link href={'/payment'}><button className="bg-blue-700 text-white py-2 px-4 rounded-lg">Pay</button></Link>}
          {formSubmit == true && <div className="text-green-800 font-bold text-lg">Order Submit Successfully</div>}
        </div>
      </div>
    <Footer/>
    </>
  );
};

export default CheckoutMain;