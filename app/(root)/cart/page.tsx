"use client";

import CartItamCard from "@/components/Cards/CartItemCard";
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
    <main className="md:h-max">
      <div className="p-5 text-sm md:text-xl font-bold text-center border-b ">
        Your Cart
      </div>
      {user && (
        <div className="md:flex md:flex-row md:justify-evenly h-fit">
          {!fetching ? (
            <>
              <div className="md:h-[44rem] m-2 p-3 md:m-5 flex flex-col md:w-3/4 rounded-lg">
                <div className="text-gray-600 md:text-2xl">All Products</div>
                <div className="flex flex-col overflow-y-scroll no-scrollbar">
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
                        cartId={cart?.cart_id}
                      />
                    ))
                  )}
                </div>
              </div>
              {/* <CheckoutCard /> */}
            </>
          ) : (
            <div className="h-screen w-full flex justify-center items-center">
              <Loader />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default CartPage;
