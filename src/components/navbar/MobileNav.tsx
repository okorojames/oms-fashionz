"use client";
import { cn } from "@/libs/cn";
import { Routes } from "@/libs/links-and-routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
  const pathname = usePathname();
  return (
    <div className="sticky flex 576:hidden items-center gap-3 justify-around bottom-0 border-t-2 left-0 bg-white py-5 px-2">
      {Routes?.map((route, index) => {
        const active = pathname === route.link;
        return (
          <Link
            key={index}
            href={route?.link}
            className={cn(
              "flex items-center flex-col text-slate-800 transition-all duration-300 hover:text-slate-600",
              active && "text-blue-600"
            )}
          >
            {route?.icon}
            <small>{route?.name}</small>
          </Link>
        );
      })}
    </div>
  );
};
