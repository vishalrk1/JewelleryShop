"use client";
import React, { useEffect } from "react";
import OrdersContainer from "@/components/Cards/OrderContainer";
import { redirect } from "next/navigation";

// zustand store
import useOrderStore from "@/hooks/useOrderStore";
import useUserStore from "@/hooks/useUserStore";
import useAuthStore from "@/hooks/useAuthStore";
import OrdersContainerSkeleton from "@/components/Skeletons/OrderCardSkeleton";

const OrdersPage = () => {
  const { token } = useAuthStore();
  const { user } = useUserStore();
  const { orders, fetching, getOrders } = useOrderStore();

  if (!user) {
    redirect("/");
  }

  useEffect(() => {
    if (token) getOrders(token);
  }, [token, getOrders]);

  return (
    <main className="min-h-screen flex flex-col divide-y-2 mx-auto max-w-6xl md:mt-6 px-4 md:px-12">
      <section className="mt-6 mx-3 mb-2">
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
              <OrdersContainer orderData={order} key={order._id} />
            ))
          )}
        </section>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen h-full my-4">
          {[1,2,3,4].map(() => (
            <OrdersContainerSkeleton key={Math.random()} />
          ))}
        </div>
      )}
    </main>
  );
};

export default OrdersPage;
