"use client";
import Loader from "@/components/Loader";
import ProductList from "@/components/Products/ProductList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store/store";
import { getWishlist } from "@/redux/store/wishlist/action";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WislistPage = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { wishlist, fetching } = useSelector(
    (state: RootState) => state.wishlist
  );

  if (!user) return redirect("/");

  useEffect(() => {
    if (user) {
      dispatch(getWishlist({ user_id: user.id }));
    }
  }, []);

  console.log(wishlist);
  return (
    <main className="h-screen">
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
              {wishlist && (
                <ProductList
                  currentTab="all"
                  productsData={wishlist}
                  isWishlist={true}
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
