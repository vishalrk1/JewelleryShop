"use client";
import ProductsTabs from "@/components/Products/ProductsTabs";
import useProductStore from "@/hooks/useProductStore";
import React, { useEffect } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import useCategoryStore from "@/hooks/useCategoryStore";

interface Props {
  params: { catId: string[] };
}

const ProductsPage: React.FC<Props> = ({ params }) => {
  const categoryId = params.catId[0];
  const { products, getProducts, fetching } = useProductStore();
  const { categories } = useCategoryStore();
  const selectedCategory = categories.find(
    (category) => category._id === categoryId
  );

  const [currentTab, setCurrentTab] = React.useState("all");

  useEffect(() => {
    getProducts(categoryId, currentTab !== "all");
  }, [currentTab]);

  return (
    <main className="p-4 sm:px-6 sm:py-0 md:gap-8 my-6 min-h-screen">
      <div className="my-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{selectedCategory?.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
