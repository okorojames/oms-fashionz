import connectDB from "@/libs/mongodb/mongodb";
import Product from "@/schemas/product";
import { ProductDetailView } from "../../_components/ProductDetailView";
import { Fragment } from "react";
import { ProductProps } from "@/types/ProductProps";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params?.id);

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      type: "website",
      locale: "en_US",
      title: product?.title,
      description: product?.description,
      url: `https://oms-fashion.vercel.app/products/${params?.id}`,
      images: [
        {
          url: product?.images[0]?.url, // Using the first image as the OG image
          width: 800,
          height: 600,
          alt: product?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product?.title,
      description: product?.description,
      images: [product?.images[0]?.url],
    },
  };
}
const ProductPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Ensure the MongoDB document is converted to a plain object
    const product = await Product.findById(params?.id).lean().exec();

    // If no product is found, return a 404 page
    if (!product) {
      return notFound();
    }

    // Convert the data to be plain JSON-serializable
    const data: ProductProps = {
      _id: product._id.toString(), // Convert ObjectId to string
      category: product.category as "clothings" | "shoes",
      description: product.description || "",
      images:
        product.images?.map((img: { url: string; id: string }) => ({
          url: img.url,
          id: img.id,
        })) || [],
      price: product.price || "",
      title: product.title || "",
    };

    return (
      <Fragment>
        <ProductDetailView product={data} />
      </Fragment>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
};

export default ProductPage;
