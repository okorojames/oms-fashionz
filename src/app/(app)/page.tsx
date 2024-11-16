import { RecentProducts } from "@/components/base-components/RecentProducts";
import { HomeFilters } from "@/components/HomeFilters";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section className="side-space">
      <div className="flex justify-between items-center flex-wrap gap-5 mt-5 mb-10">
        <h4 className="font-alegreya-sans text-lg sm:text-2xl font-semibold text-slate-700">
          Recent Items
        </h4>
        <HomeFilters />
      </div>
      {/*  */}
      <Suspense fallback={<div></div>}>
        <RecentProducts />
      </Suspense>
    </section>
  );
}
