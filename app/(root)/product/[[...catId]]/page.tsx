"use client";
import ProductsTabs from "@/components/Products/ProductsTabs";
import { getProducts } from "@/redux/store/products/action";
import { RootState } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  params: { catId: string[] };
}

const ProductsPage: React.FC<Props> = ({ params }) => {
  const categoryId = params.catId[0];
  const dispatch = useDispatch<any>();
  const { products, fetching } = useSelector((state: RootState) => state.products);

  const [currentTab, setCurrentTab] = React.useState("all");
  useEffect(() => {
    const isFeatured = currentTab !== "all";
    dispatch(getProducts({ categoryId, isFeatured }));
  }, [categoryId, currentTab, dispatch]);

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
