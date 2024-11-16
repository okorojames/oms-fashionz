"use client";
import { cn } from "@/libs/cn";
import { Routes } from "@/libs/links-and-routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="side-space sticky top-0 left-0 z-[9999] bg-white flex justify-center 576:justify-between items-center shadow-md py-2 576:py-3 gap-4">
      <Link href={"/"}>
        <Image
          src="/oms-logo2.png"
          alt="OMS Logo"
          width={60}
          height={60}
          className="w-[60px] h-[60px]"
        />
      </Link>
      <div className="hidden 576:flex items-center gap-12">
        {Routes?.map((route, index) => {
          const active = pathname === route.link;
          return (
            <Link
              key={index}
              className={cn(
                "text-sm sm:text-base transition-all duration-500 hover:text-blue-600",
                active && "text-blue-600"
              )}
              href={route?.link}
            >
              {route?.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
