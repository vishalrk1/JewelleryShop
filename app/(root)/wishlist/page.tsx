"use client";
import Loader from "@/components/Loader";
import ProductList from "@/components/Products/ProductList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/hooks/useAuthStore";
import useWishlistStore from "@/hooks/useWishlistStore";
import React, { useEffect } from "react";

const WislistPage = () => {
  const { token } = useAuthStore();
  const { wishlist, getWishlist, fetching } = useWishlistStore();

  useEffect(() => {
    if (token && !wishlist) {
      getWishlist(token);
    }
  }, [token]);

  return (
    <main className="min-h-screen">
      <section className="p-4">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Your Wishlist</TabsTrigger>
          </TabsList>
          {fetching ? (
            <div className="w-full h-screen flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {wishlist?.products?.length === 0 ? (
                <div className="w-full flex flex-col justify-center items-center h-screen">
                  <h1 className="text-2xl text-gray-700">
                    Wishlist Is Empty 🙃
                  </h1>
                </div>
              ) : (
                <ProductList
                  currentTab="all"
                  productsData={wishlist?.products || []}
                  isWishlist={true}
                  isLoadings={fetching}
                />
              )}
            </>
          )}
        </Tabs>
      </section>
    </main>
  );
};

export default WislistPage;
