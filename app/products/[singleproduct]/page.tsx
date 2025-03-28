import React from 'react'
import Singlepage from '@/components/Singlepage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
interface PageProps{
    params:{
        singleproduct:string
    }
}
const page:React.FC<PageProps> = ({params}) => {
    const productName = decodeURI(params.singleproduct)

  return (
    <>
    <Navbar/>
    <div>
        <Singlepage productName = {productName}/>
    </div>
    <Footer/>
    </>
  )
}

export default page
