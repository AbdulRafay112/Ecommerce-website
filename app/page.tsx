import Herosection from "@/components/Herosection";
import Services from "@/components/Services";
import Trusted from "@/components/Trusted";
import FeaturedProduct from "@/components/FeaturedProduct"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  const data = {
    name:"Rafay Store"
  }
  return (
   <>
   <Navbar/>
   <Herosection name = {data.name}/>
   <FeaturedProduct/>
   <Services/>
   <Trusted/>
   <Footer/>
   </>
  );
}
