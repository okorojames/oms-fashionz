export interface ProductProps {
  title: string;
  description: string;
  images: {
    url: string;
    id: string;
  }[];
  _id: string;
  price: string;
  category: "clothings" | "shoes";
}
