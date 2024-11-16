import connectDB from "@/libs/mongodb/mongodb";
import Product from "@/schemas/product";
import { ProductDetailView } from "../../_components/ProductDetailView";
import { Fragment } from "react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params?.id).lean().exec();

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
    const data = await fetch(
      `${process.env.BASE_URL}/api/get-products/${params.id}`
    ).then((res) => res.json());
    //
    return (
      <Fragment>
        <ProductDetailView product={data?.product} />
      </Fragment>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
};

export default ProductPage;
