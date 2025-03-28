"use client"
import React , {useState} from "react";
import AllOrders from "./AllOrders";
import PendingOrders from "./PendingOrders";
import DispatchOrders from "./DispatchOrders";
import SuccessOrders from "./SuccessOrders";
const DashboardNavbar = () => {
    const [activeLink, setActiveLink] = useState("all")
    const handleActiveLink = (link:string)=>{
        setActiveLink(link)
    }
  return (
    <>
      <nav className="h-[100px] bg-blue-700 text-white flex items-center justify-between px-11">
        <div className="left">
          <div className="font-bold text-2xl">Admin Dashboard</div>
        </div>
        <div className="right">
          <ul className="flex items-center list-none gap-6">
            <li onClick={()=>handleActiveLink("all")} className={`${activeLink === "all" ? "bg-white px-2 py-1 text-blue-700 rounded-lg" : ""} cursor-pointer`}>All</li>
            <li onClick={()=>handleActiveLink("pending")} className={`${activeLink === "pending" ? "bg-white px-2 py-1 text-blue-700 rounded-lg" : ""} cursor-pointer`}>Pending</li>
            <li onClick={()=>handleActiveLink("dispatch")} className={`${activeLink === "dispatch" ? "bg-white px-2 py-1 text-blue-700 rounded-lg":""} cursor-pointer`}>Dispatch</li>
            <li onClick={()=>handleActiveLink("success")} className={`${activeLink === "success" ? "bg-white px-2 py-1 text-blue-700 rounded-lg": ""} cursor-pointer`}>Success</li>
          </ul>
        </div>
      </nav>
      {activeLink === "all" && <AllOrders/>}
      {activeLink === "pending" && <PendingOrders/>}
      {activeLink === "dispatch" && <DispatchOrders/>}
      {activeLink === "success" && <SuccessOrders/>}
    
    </>
  );
};

export default DashboardNavbar;
