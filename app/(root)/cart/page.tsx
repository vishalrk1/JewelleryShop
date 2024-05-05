"use client";

import CartItamCard from "@/components/Cards/CartItemCard";
import CheckoutCard from "@/components/Cards/CheckoutCard";
import Loader from "@/components/Loader";
import { getCart } from "@/redux/store/cart/action";
import { RootState } from "@/redux/store/store";
import { redirect } from "next/navigation";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const dispatch = useDispatch<any>();
  const { user, userData } = useSelector((state: RootState) => state.auth);
  const { cart, cartItems, fetching } = useSelector(
    (state: RootState) => state.cart
  );

  if (!user) redirect("/login");

  useEffect(() => {
    if (user) {
      const id = user?.id;
      const email = user?.email;
      dispatch(getCart({ id, email }));
    }
  }, [user]);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
      <div className="space-y-6">
        <div className="p-5 text-sm md:text-xl font-bold text-center border-b ">
          Your Cart
        </div>
        <div className="space-y-4">
          {user && (
            <>
              {!fetching ? (
                <div className="cmd:h-[500px] w-full flex flex-col overflow-y-scroll no-scrollbar md:p-3 border-slate-50">
                  {cartItems?.length === 0 ? (
                    <div className="flex justify-center items-center overflow-hidden h-[40rem]">
                      <div className="text-gray-600 md:text-2xl mt-5">
                        No products in cart 🫠
                      </div>
                    </div>
                  ) : (
                    cartItems?.map((item, index) => (
                      <CartItamCard
                        key={index}
                        cartProduct={item}
                        product={item?.products_product}
                        cartId={item?.cart_id}
                      />
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
      </div>
      <CheckoutCard />
    </div>
  );
};

export default CartPage;
