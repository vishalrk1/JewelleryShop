"use client";
import React from "react";
import { TabsContent } from "../ui/tabs";
import ProductCard from "../Cards/ProductCard";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton";

interface Props {
  productsData: any[];
  currentTab: string;
  isWishlist?: boolean;
  isLoadings: boolean;
}

const ProductList: React.FC<Props> = ({
  productsData,
  currentTab,
  isWishlist = false,
  isLoadings,
}) => {
  return (
    <TabsContent
      value={currentTab}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {isLoadings
        ? [...Array(10)].map((_, index) => <ProductCardSkeleton />)
        : productsData?.map((item) => {
            return (
              <ProductCard item={item} isWishlist={isWishlist} key={item.id} />
            );
          })}
    </TabsContent>
  );
};

export default ProductList;
