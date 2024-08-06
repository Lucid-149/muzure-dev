import { NextRequest, NextResponse } from "next/server";
import { PaystackAPI } from "@/classes/data";
const Paystack = new PaystackAPI(process.env.PAYSTACK_SECRET!)
export async function GET(request: NextRequest) {
  const data = request.body;

  try {
    const result = await Paystack.initializeTransaction;
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}