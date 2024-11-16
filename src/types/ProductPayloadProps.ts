export interface ProductPayloadProps {
  title: string;
  description: string;
  images: File[];
  url: string;
  id: string;
  price: string;
  category: "clothings" | "shoes";
}
