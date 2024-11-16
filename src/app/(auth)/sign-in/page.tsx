"use client";
import { Input } from "@/components/base-components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const SignInPage = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const Login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/login-s-now", data);
    if (res.statusText === "OK") {
      router.replace("/new-product");
    }
  };
  //
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={Login}
        className="w-[94%] sm:w-[550px] mx-auto flex flex-col gap-3"
      >
        <Input
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Email"
          type="email"
        />
        <Input
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Password"
          type="password"
        />
        <button className="bg-blue-500 text-white py-2 rounded-md">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
