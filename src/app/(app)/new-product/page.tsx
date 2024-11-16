"use client";
import { Input } from "@/components/base-components/Input";
import { Loader } from "@/components/base-components/Loader";
import { notify } from "@/libs/notify";
import axios from "axios";
import React, { useState } from "react";

const NewProduct = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    category: "clothings",
    images: [] as File[],
  });
  //
  const [loading, setLoading] = useState(false);
  //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      if (data.images) {
        for (const img of data.images) {
          formData.append("images", img);
        }
      }
      const res = await axios.post("/api/create-product", formData);
      if (res.status === 201) {
        notify({ type: "success", message: "Product created successfully!" });
        setData({
          title: "",
          description: "",
          price: "",
          category: "clothings",
          images: [],
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify({ type: "error", message: error.message });
      }

      // throw error;
    } finally {
      setLoading(false);
    }
  };
  //
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[94%] sm:w-[550px] mx-auto flex flex-col gap-3"
      >
        <Input
          type="text"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Product Title"
        />
        <textarea
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows={5}
          className="outline-none border rounded-md p-2"
          placeholder="Description"
        ></textarea>
        <Input
          type="number"
          onChange={(e) => setData({ ...data, price: e.target.value })}
          placeholder="Price"
        />
        <select
          className="outline-none border rounded-md p-2"
          onChange={(e) => setData({ ...data, category: e.target.value })}
          defaultValue="clothings"
        >
          <option value="clothings">Clothings</option>
          <option value="shoes">Shoes</option>
        </select>
        <Input
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setData({ ...data, images: files });
          }}
          placeholder="Images"
          accept="image/*"
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded-md"
        >
          {loading ? (
            <span>
              <Loader />
            </span>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
