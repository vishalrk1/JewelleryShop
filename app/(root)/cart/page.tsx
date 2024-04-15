"use client";

import { RootState } from "@/redux/store/store";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { user, userData } = useSelector((state: RootState) => state.auth);

  if (!user) redirect("/login");

  console.log(userData);

  return (
    <main className="md:h-max">
      <div className="p-5 text-sm md:text-xl font-bold text-center border-b ">
        Your Cart
      </div>
      {}
    </main>
  );
};

export default CartPage;
