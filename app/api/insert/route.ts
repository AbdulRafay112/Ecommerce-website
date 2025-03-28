import axios from "axios";
import {client} from "@/sanity/lib/client"
import { NextResponse } from "next/server";
export async function POST(){
    try{
        const {data} = await axios.get('https://template-0-beta.vercel.app/api/product')
        for(const product of data){
            await client.create({
                _type:'product',
                id: product.id,
                name: product.name,
                imagePath: product.imagePath,
                price: parseFloat(product.price),
                description: product.description,
                discountPercentage: product.discountPercentage,
                isFeaturedProduct: product.isFeaturedProduct,
                stockLevel: product.stockLevel,
                category: product.category,
            })
        }
        return NextResponse.json({message:'data inserted successfully'} , {status:200})

    }
    catch(error){
        console.log(error , "error in submitting data in sanity")
    }
}