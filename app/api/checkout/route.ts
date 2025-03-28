import { NextRequest, NextResponse } from "next/server";
import { Checkout } from "@/components/Checkout";
export async function POST(req:NextRequest){
    try{
        const {cart , customerInfo} = await req.json()
        const result = await Checkout(cart , customerInfo)
        return NextResponse.json(result)
    }
    catch(error){
        console.log(error)
        return NextResponse.json("checkout failed")
    }
}