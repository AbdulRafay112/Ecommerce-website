"use server"
import { cookies } from "next/headers";
export const GetToken = ()=>{
     const token = cookies().get("token")
     return token
}