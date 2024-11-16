import { ClothIcon } from "@/icons/ClothIcon";
import { Home } from "@/icons/Home";
import { ShoeIcon } from "@/icons/ShoeIcon";

export const Routes = [
  {
    name: "Home",
    link: "/",
    icon: <Home />,
  },
  {
    name: "Clothes",
    link: "/clothes",
    icon: <ClothIcon />,
  },
  {
    name: "Shoes",
    link: "/shoes",
    icon: <ShoeIcon />,
  },
];
