import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb/mongodb";
import Product from "@/schemas/product";
import { ProductProps } from "@/types/ProductProps";

export async function GET(request: Request) {
  await connectDB();

  // Extract search parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || ""; // "clothings" or "shoes"
  const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
  const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page

  try {
    // Build filter object based on category
    const filter: Partial<ProductProps> = {};
    if (category) {
      filter.category = category as "clothings" | "shoes";
    }

    // Fetch products with pagination and filtering
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by latest

    // Get the total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Return the response
    return NextResponse.json(
      {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products", error },
      { status: 500 }
    );
  }
}
