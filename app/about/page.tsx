import Herosection from "@/components/Herosection"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
const page = () => {
    const data = {
        name:"Rafay Ecommerce"
    }
  return (
    <div>
      <Navbar/>
        <Herosection name = {data.name}/>
        <Footer/>
    </div>
  )
}

export default page
