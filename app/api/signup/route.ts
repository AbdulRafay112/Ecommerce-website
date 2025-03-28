import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";
export async function POST(req:NextRequest){
    try{
        const {email , password} = await req.json()
        if(!email || !password)
            return NextResponse.json({message:"Email or Password required"} , {status:400})
        await connectToDatabase()
        const existingUser = await User.findOne({email})
        if(existingUser)
            return NextResponse.json({message:"User Already Exists"} , {status:400})
        await User.create({email , password})
        return NextResponse.json({message:"User Registered Successfully"} , {status:200})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({message:"registration failed"} ,{status:200})
    }
}