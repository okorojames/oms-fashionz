"use client";
import { cn } from "@/libs/cn";
import { ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

export const FilterSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  //
  const s = params.get("s") || "";
  //
  const [open, setOpen] = useState<boolean>(false);
  const [filterHieght, setFilterHieght] = useState<number>(0);
  //
  const filterHeightRef = useRef<HTMLDivElement>(null);
  //

  useEffect(() => {
    if (filterHeightRef.current) {
      const height = open ? filterHeightRef.current.scrollHeight : 0;
      setFilterHieght(height);
    }
  }, [open]);

  // render here...
  return (
    <div className="relative w-[120px]">
      <div
        onClick={() => setOpen(!open)}
        className="flex select-none text-sm cursor-pointer border rounded-md px-2 py-2 items-center gap-2"
      >
        <span>
          <ListFilter size={16} />
        </span>
        <span className="capitalize">{s ? s : "Filter"}</span>
      </div>
      {/*  */}
      <div
        ref={filterHeightRef}
        className={cn(
          "overflow-hidden absolute top-10 bg-white rounded-md flex flex-col gap-2 w-full text-sm transition-all duration-300",
          open ? "border" : ""
        )}
        style={{
          height: open ? `${filterHieght}px` : "0px",
        }}
      >
        <div
          className={cn(
            "cursor-pointer select-none py-2 px-2",
            s === "" && "text-blue-600 bg-blue-100"
          )}
          onClick={() => {
            params.set("s", "");
            router.push(`?${params.toString()}`);
          }}
        >
          All
        </div>
        <div
          className={cn(
            "cursor-pointer select-none py-2 px-2",
            s === "clothings" && "text-blue-600 bg-blue-100"
          )}
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            params.set(
              "s",
              e.currentTarget.textContent?.toLowerCase() as string
            );
            router.push(`?${params.toString()}`);
          }}
        >
          Clothings
        </div>
        <div
          className={cn(
            "cursor-pointer select-none py-2 px-2",
            s === "shoes" && "text-blue-600 bg-blue-100"
          )}
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            params.set(
              "s",
              e.currentTarget.textContent?.toLowerCase() as string
            );
            router.push(`?${params.toString()}`);
          }}
        >
          Shoes
        </div>
      </div>
    </div>
  );
};
