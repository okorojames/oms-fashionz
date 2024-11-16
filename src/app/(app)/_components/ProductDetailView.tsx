"use client";

import { cn } from "@/libs/cn";
import { FormatCurrency } from "@/libs/format-currency";
import { ProductProps } from "@/types/ProductProps";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductDetailView = ({ product }: { product: ProductProps }) => {
  //
  const [currImg, setCurrImg] = useState(product?.images[0]?.url);
  const [msg, setMsg] = useState("");
  //
  useEffect(() => {
    if (window !== undefined) {
      const formattedMessage = `
    Hello, I'm interested in this item:
    *Name*: ${product?.title}
    *Description*: ${product?.description}
    *Price*: ${FormatCurrency(Number(product?.price))}
    *Link*: ${window.location.href} 
    
    Is this item available?
    `;
      setMsg(formattedMessage);
    }
  }, []);
  //
  const encodedMessage = encodeURIComponent(msg.trim());

  const whatsappNumber =
    product?.category === "shoes" ? "+2348160825209" : "+2347026574229";

  const whatsappLink = `https://wa.me/${whatsappNumber}/?text=${encodedMessage}`;

  //
  return (
    <div className="mt-12 side-space grid grid-cols-1 gap-5 sm:grid-cols-2 sm:justify-items-center">
      {/* col 1 */}
      <div className="w-full">
        <div className="w-full">
          <Image
            src={currImg}
            alt={product?.title}
            width={300}
            height={200}
            className="w-full object-cover object-center"
          />
        </div>
        {/*  */}
        <div className="w-full overflow-auto mt-4 p-3">
          <div className="flex gap-2 items-center rounded-md">
            {product?.images?.map((img: { url: string; id: string }) => (
              <Image
                key={img.id}
                src={img.url}
                alt={product?.title}
                width={100}
                height={100}
                className={cn(
                  "object-cover rounded-md border-[2.5px] border-slate-700 object-center",
                  img.url === currImg && "border-blue-500"
                )}
                onClick={() => setCurrImg(img.url)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* col 2 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-5 items-center">
          <h3 className="font-semibold md:font-bold text-slate-800">
            {product?.title}
          </h3>
          <p className="font-alegreya-sans font-semibold text-slate-500">
            {FormatCurrency(Number(product?.price))}
          </p>
        </div>
        <span className="text-slate-500 font-semibold">
          {product?.category}
        </span>
        <p className="text-slate-500 text-sm">{product?.description}</p>
        <Link
          className="self-start bg-blue-600 text-white py-2 px-3 rounded-md text-center text-sm"
          target="_blank"
          href={whatsappLink}
        >
          Request Product
        </Link>
      </div>
    </div>
  );
};
