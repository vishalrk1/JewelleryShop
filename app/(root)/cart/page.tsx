"use client";

import CartItamCard from "@/components/Cards/CartItemCard";
import CheckoutCard from "@/components/Cards/CheckoutCard";
import Loader from "@/components/Loader";

import useCartStore from "@/hooks/useCartStore";
import useUserStore from "@/hooks/useUserStore";
import React from "react";

const CartPage = () => {
  const { user, fetching } = useUserStore();
  const { cart } = useCartStore();
  return (
    <main className="container min-h-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
      <section className="space-y-6">
        <div className="p-5 text-sm md:text-xl font-bold text-center border-b ">
          Your Cart
        </div>
        <div className="space-y-4">
          {user && (
            <>
              {!fetching ? (
                <div className="cmd:h-[500px] w-full flex flex-col overflow-y-scroll no-scrollbar md:p-3 border-slate-50">
                  {cart?.items?.length === 0 ? (
                    <div className="flex justify-center items-center overflow-hidden h-max-content">
                      <div className="text-gray-600 md:text-2xl mt-5">
                        No products in cart 🫠
                      </div>
                    </div>
                  ) : (
                    cart?.items?.map((item, index) => (
                      <CartItamCard key={item._id} item={item} />
                    ))
                  )}
                </div>
              ) : (
                <div className="h-48 w-full flex justify-center items-center">
                  <Loader />
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <CheckoutCard />
    </main>
  );
};

export default CartPage;
