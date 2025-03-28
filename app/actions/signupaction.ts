'use server'
import z from "zod";

// Define proper types
interface ZodErrors {
  email?: string[];
  password?: string[];
}

interface FormState {
  message: string;
  zodErrors?: ZodErrors;
}

interface FormFields {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export const handleSubmitForm = async(prevState: FormState, formData: FormData): Promise<FormState> => {
    try {
        const fields: FormFields = {
            email: formData.get("email"),
            password: formData.get("password")
        };
        
        const validationSchema = z.object({
            email: z.string().email(),
            password: z.string().nonempty({message: "password can not be empty"})
        });
        
        const isValidate = validationSchema.safeParse(fields);
        
        if (!isValidate.success) {
            const errors = isValidate.error.flatten().fieldErrors;
            return {
                message: "signup failed",
                zodErrors: errors as ZodErrors
            };
        }
        
        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        });
        
        const data = await response.json();
        
        if (!response.ok)
            return { message: data.message };
            
        return { message: data.message };
    }
    catch (error: unknown) {
        // Properly handle the error
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.log(errorMessage);
        return { message: errorMessage };
    }
}