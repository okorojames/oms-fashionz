import uploadToCloud from "@/libs/cloudinary/cloudinary";
import deleteUploadedFiles from "@/libs/cloudinary/delete-uploaded-files";
import connectDB from "@/libs/mongodb/mongodb";
import Product from "@/schemas/product";
import { ProductPayloadProps } from "@/types/ProductPayloadProps";
import { NextResponse } from "next/server";

export const requestConfig = {
  bodyParser: {
    sizeLimit: "5mb", // Optional: set size limit
  },
};
export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.formData();
    const formData: Partial<ProductPayloadProps> = {
      title: body.get("title") as string,
      description: body.get("description") as string,
      price: body.get("price") as string,
      category: body.get("category") as "clothings" | "shoes",
      images: body.getAll("images") as File[],
    };
    //
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      formData.images?.length === 0
    ) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400, statusText: "Bad Request" }
      );
    }
    //upload images first
    const uploadedImgs = [];
    if (formData.images && formData.images.length > 0) {
      for (const img of formData.images) {
        const uploaded = await uploadToCloud(img, "products");
        uploadedImgs.push(uploaded);
      }
    }
    //
    //save product
    try {
      const product = new Product({
        ...formData,
        images: uploadedImgs,
      });
      if (uploadedImgs.length > 0) {
        await product.save();
      }

      return NextResponse.json(
        {
          message: "Product created successfully",
        },
        { status: 201 }
      );
    } catch (dbError) {
      if (uploadedImgs.length > 0) {
        await deleteUploadedFiles(uploadedImgs);
      }
      throw dbError;
    }
    //

    //
  } catch (error) {
    return NextResponse.json(
      {
        message: error || "Something went wrong",
      },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
