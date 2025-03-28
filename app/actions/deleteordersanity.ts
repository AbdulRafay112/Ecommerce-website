"use server"

import { redirect } from "next/navigation"

export const deleteOrder = async(orderId:string)=>
{
     await fetch("http://localhost:3000/api/deleteorder" , {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({orderId:orderId})
    })
    redirect("dashboard")
}