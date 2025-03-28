"use server"

import { redirect } from "next/navigation"
import * as jose from 'jose'
import { cookies } from "next/headers"

// Define interfaces for better type safety
interface SignInFields {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

interface UserData {
  id: string | number;
}

interface ApiResponse {
  message: string;
  user?: UserData;
}

const handleSubmitForm = async (prevState: string, formData: FormData): Promise<string> => {
    try {
        const fields: SignInFields = {
            email: formData.get("email"),
            password: formData.get("password")
        };
        
        // post data to end point for login
        const response = await fetch("http://localhost:3000/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        });

        const data: ApiResponse = await response.json();

        // return error message if user not found
        if (!response.ok)
            return data.message;

        const user = data.user;
        
        if (!user) {
            return "User data is missing";
        }
        
        // payload stored in generated token
        const payload = {
            user: user,
            roles: ['admin', 'user'],
            permissions: {
                read: true,
                write: true
            }
        };
        
        // Check if SECRET environment variable exists
        const secretKey = process.env.SECRET;
        if (!secretKey) {
            return "Server configuration error: Missing SECRET key";
        }
        
        // generate jwt token
        const secret = new TextEncoder().encode(secretKey);
        const alg = 'HS256';
        const token = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setSubject(user.id.toString())
            .setExpirationTime('1m') // jwt token timeout value
            .sign(secret);

        // save token in cookie
        const expirationDate = new Date(Date.now() + 1 * 60 * 1000); // set cookie timeout value

        cookies().set("token", token, {
            expires: expirationDate,
            httpOnly: true,
            path: "/",
            sameSite: "strict"
        });
    }
    catch (error: unknown) {
        console.log(error instanceof Error ? error.message : "An unknown error occurred");
        return error instanceof Error ? error.message : "An unknown error occurred";
    }
    
    redirect("/cart");
};

export default handleSubmitForm;