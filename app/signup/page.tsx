'use client'
import { useFormState } from "react-dom";
import { handleSubmitForm } from "../actions/signupaction";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

// Define types for your form state
interface ZodErrors {
  email?: string[];
  password?: string[];
}

interface FormState {
  message: string;
  zodErrors?: ZodErrors;
}

export default function Signup() {
    const initial_state: FormState = {
        message: "",
        zodErrors: undefined
    }
    const [formState, formAction] = useFormState(handleSubmitForm, initial_state);
 
    return (
        <>
        <Navbar/>
        <div className="flex justify-center items-center h-screen">
                <form action={formAction} className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 w-full">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                        />
                     {formState.zodErrors?.password && <div className="text-lg font-bold text-red-700">{formState.zodErrors?.password}</div>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                        type="text"
                        name="email"
                        id="email"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                        />
                       {formState.zodErrors?.email && <div className="text-lg font-bold text-red-700">{formState.zodErrors?.email}</div>}
                    </div>
                    <div>
                        <input
                        type="submit"
                        value="SignUp"
                        className={`w-full bg-blue-500 text-white font-medium py-2 rounded-lg  hover:bg-blue-600 cursor-pointer`}
                        />
                    </div>
                    {formState && <div className="text-red-700 font-bold text-lg">{formState.message}</div>}
                    <div>Already have an account? <b><Link href="/signin"><button>Sign In</button></Link></b></div>
                </form>               
        </div>
        <Footer/>
        </>
    );
}
