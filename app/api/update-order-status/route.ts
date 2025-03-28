import { client } from "@/sanity/lib/client";
import { NextRequest , NextResponse } from "next/server";
export async function POST(req:NextRequest){
    try{
        const {customerId , newOrderStatus} = await req.json()
        if(!customerId || !newOrderStatus)
            return NextResponse.json({message:"missing required paramters orderId or orderStatus"} , {status:400})
         await client
        .patch(customerId)
        .set({ orderStatus: newOrderStatus })
        .commit();
        return NextResponse.json({message:"congrats you successfylly edit the customer"} , {status:200})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({message:"not found customer"} , {status:400})
    }
}