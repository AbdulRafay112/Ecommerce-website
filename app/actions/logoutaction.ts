'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const LogOutAction = ()=>{
    cookies().set("token","",{expires:new Date(0)})
    redirect('/signin')
}