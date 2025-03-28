import React from 'react'
import PaymentForm from '@/components/Payment'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const page = () => {
  return (
    <>
    <Navbar/>
    <div>
        <PaymentForm/>
    </div>
    <Footer/>
    </>
  )
}

export default page
