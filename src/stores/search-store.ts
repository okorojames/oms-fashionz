import { create } from "zustand";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

export const useSearch = create<Props>((set) => {
  return {
    search: "",
    //
    setSearch: (value: string) => set({ search: value }),
  };
});
