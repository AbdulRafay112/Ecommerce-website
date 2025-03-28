import { NextRequest , NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
export async function POST(req:NextRequest){
   try{
    const {email , password} = await req.json()
    if(!email || !password)
        return NextResponse.json({message:"email or password required"} , {status:400})
    await connectToDatabase()
    const existingUser = await User.findOne({email})
    if(!existingUser)
        return NextResponse.json({message:"account not found for this email"} , {status:400})
    const passwordIsValid = await bcrypt.compare(password,existingUser.password)
    if(!passwordIsValid)
        return NextResponse.json({message:"password is incorrect for this account"} , {status:400})
    return NextResponse.json({message:"user Login succesfully" , user:{email:existingUser.email , id:existingUser.id}} , {status:200})
   }
   catch(error){
    console.log(error)
    return NextResponse.json({message:"login failed"} , {status:400})
   }
}