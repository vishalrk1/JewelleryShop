"use client";
import ProductsTabs from "@/components/Products/ProductsTabs";
import useProductStore from "@/hooks/useProductStore";
import React, { useEffect } from "react";

interface Props {
  params: { catId: string[] };
}

const ProductsPage: React.FC<Props> = ({ params }) => {
  const categoryId = params.catId[0];
  const {products, getProducts, fetching} = useProductStore()
  const [currentTab, setCurrentTab] = React.useState("all");

  useEffect(()=>{
    getProducts(categoryId, currentTab !== "all")
  }, [currentTab])

  return (
    <main className="p-4 sm:px-6 sm:py-0 md:gap-8 my-6 min-h-screen">
      <ProductsTabs
        productsData={products}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isLoading={fetching}
      />
    </main>
  );
};

export default ProductsPage;
