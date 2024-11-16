import mongoose, { Model, Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  images: {
    url: string;
    id: string;
  }[];
  price: string;
  category: "clothings" | "shoes";
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [
        {
          url: String,
          id: String,
        },
      ],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      enum: ["clothings", "shoes"],
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
