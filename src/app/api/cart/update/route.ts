import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json(); // Parse the JSON body
  const { action, itemId } = body;

  if (action === "increase") {
    console.log("Increase action:", action, "Item ID:", itemId);
    // Logic to increase quantity
  } else if (action === "decrease") {
    console.log("Decrease action:", action, "Item ID:", itemId);
    // Logic to decrease quantity
  }

  // Redirect or return a response
  return NextResponse.redirect(new URL("/cart", req.url));
}
