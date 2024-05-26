"use client";
import ProductsTabs from "@/components/Products/ProductsTabs";
import { products_product } from "@/prisma/generated/client";
import { getProducts } from "@/redux/store/products/action";
import { RootState } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: { catId: string[] };
}

const ProductsPage: React.FC<Props> = ({ params }) => {
  const categoryId = parseInt(params.catId[1], 10);
  const dispatch = useDispatch<any>();
  const [currentTab, setCurrentTab] = React.useState("all");
  const { products, fetching } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const isFeatured = currentTab !== "all";
    dispatch(getProducts({ categoryId, isFeatured }));
  }, [categoryId, currentTab]);

  return (
    <main className="p-4 sm:px-6 sm:py-0 md:gap-8 my-6 min-h-screen">
      <ProductsTabs
        productsData={products as products_product[]}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isLoading={fetching}
      />
    </main>
  );
};

export default ProductsPage;
