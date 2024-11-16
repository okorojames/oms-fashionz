import connectDB from "@/libs/mongodb/mongodb";
import Product from "@/schemas/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,

  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404, statusText: "Not Found" }
      );
    }
    return NextResponse.json({ product }, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
