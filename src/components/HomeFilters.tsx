"use client";
import React, { Suspense } from "react";
import { Input } from "./base-components/Input";
import { Search } from "lucide-react";
import { FilterSelect } from "./base-components/FilterSelect";
import { useSearch } from "@/stores/search-store";

export const HomeFilters = () => {
  const { setSearch } = useSearch();
  //
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        type="search"
        placeholder="Search"
        classNames={{ input: "text-sm placeholder:text-sm" }}
        endIcon={<Search size={16} />}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Suspense fallback={<div></div>}>
        <FilterSelect />
      </Suspense>
    </div>
  );
};
