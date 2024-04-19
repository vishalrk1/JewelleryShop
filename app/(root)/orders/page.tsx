"use client";
import OrdersContainer from "@/components/Cards/OrderContainer";
import Loader from "@/components/Loader";
import { getOrders } from "@/redux/store/orders/action";
import { RootState } from "@/redux/store/store";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrdersPage = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { orders, fetching } = useSelector((state: RootState) => state.orders);

  if (!user) {
    redirect("/");
  }

  useEffect(() => {
    if (user) {
      dispatch(getOrders({ user_id: user?.id }));
    }
  }, []);

  return (
    <main className="h-screen flex flex-col divide-y-2 mx-auto max-w-8xl md:mt-6 px-4 md:px-12">
      <section className="mt-10 mx-3 mb-2">
        <h1 className="text-base md:text-2xl text-black font-bold">
          Your Orders
        </h1>
      </section>
      {!fetching ? (
        <section className="h-full overflow-y-auto flex flex-col m-3 mt-0 no-scrollbar">
          {orders?.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="text-base md:text-2xl text-gray-700">
                You Have No Orders 🙃
              </h1>
            </div>
          ) : (
            orders?.map((order, index) => (
              <OrdersContainer orderData={order} key={index} />
            ))
          )}
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen gap-3">
          <Loader className="h-10 w-10" />
          <p className="text-gray-600 md:text-2xl">Loading...</p>
        </div>
      )}
    </main>
  );
};

export default OrdersPage;
