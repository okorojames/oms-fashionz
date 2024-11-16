"use client";

import { FormatCurrency } from "@/libs/format-currency";
import { useSearch } from "@/stores/search-store";
import { ProductProps } from "@/types/ProductProps";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const RecentProducts = () => {
  const searchParams = useSearchParams();
  const s = searchParams.get("s") || "";
  //
  const { search } = useSearch();
  //
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", s],
    queryFn: async () => {
      const res = await axios.get(
        `/api/get-products${s ? `?category=${s}` : ""}`
      );
      return res.data?.products;
    },
  });

  const data = useMemo(() => {
    if (search) {
      return products?.filter((product: ProductProps) => {
        return product?.title.toLowerCase().includes(search.toLowerCase());
      });
    }
    return products;
  }, [search, products]);
  //
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {isLoading
        ? Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-64 bg-slate-200 mb-3 animate-pulse rounded-md"
            />
          ))
        : null}
      {data &&
        data?.slice(0, 9)?.map((product: ProductProps) => (
          <div
            className="flex gap-2 border border-slate-300 rounded-md overflow-hidden w-fit 376:w-[350px] mx-auto sm:w-fit flex-col"
            key={product?._id}
          >
            <div className="w-full">
              <Image
                src={product?.images[0]?.url}
                alt={product?.title}
                width={200}
                height={200}
                loading="lazy"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                className="w-full object-contain object-center"
              />
            </div>
            <Link href={`/products/${product?._id}`} className="p-3">
              <h3 className="font-semibold capitalize line-clamp-1 font-alegreya-sans text-slate-700">
                {product?.title}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2">
                {product?.description}
              </p>
              <p className="text-slate-700 text-base">
                {FormatCurrency(Number(product?.price))}
              </p>
            </Link>
          </div>
        ))}
    </div>
  );
};
