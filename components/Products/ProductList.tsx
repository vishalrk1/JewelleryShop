"use client";
import React from "react";
import { TabsContent } from "../ui/tabs";
import ProductCard from "../Cards/ProductCard";

interface Props {
  productsData: any[];
  currentTab: string;
  isWishlist?: boolean;
}

const ProductList: React.FC<Props> = ({
  productsData,
  currentTab,
  isWishlist = false,
}) => {
  return (
    <TabsContent
      value={currentTab}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {productsData?.map((item) => {
        return (
          <ProductCard item={item} isWishlist={isWishlist} key={item.id} />
        );
      })}
    </TabsContent>
  );
};

export default ProductList;
