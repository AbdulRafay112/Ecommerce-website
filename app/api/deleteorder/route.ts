import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Accept either customerId or orderId parameter
    const customerId = body.customerId || body.orderId;
    
    if (!customerId) {
      return NextResponse.json({
        message: "Missing required parameter: customerId or orderId",
      }, { status: 400 });
    }
    
    console.log("Attempting to delete customer with ID:", customerId);
    
    // Start a transaction
    const transaction = client.transaction();
    
    // Find all orders referencing this customer
    const referencingOrders = await client.fetch(
      `*[_type == "order" && customer._ref == $customerId]._id`,
      { customerId }
    );
    
    console.log("Found orders referencing this customer:", referencingOrders);
    
    // Delete all orders first
    for (const orderId of referencingOrders) {
      console.log("Adding order to delete transaction:", orderId);
      transaction.delete(orderId);
    }
    
    // Then delete the customer
    console.log("Adding customer to delete transaction:", customerId);
    transaction.delete(customerId);
    
    // Commit all operations in a single transaction
    console.log("Committing transaction...");
    const result = await transaction.commit();
    console.log("Transaction result:", result);
    
    return NextResponse.json({
      message: "Customer and related orders deleted successfully",
      deletedOrdersCount: referencingOrders.length,
      result
    }, { status: 200 });
  } catch (error) {
    console.error("Error in deletion transaction:", error);
    return NextResponse.json(
      { message: "Error deleting customer and related orders", error: String(error) }, 
      { status: 500 }
    );
  }
}