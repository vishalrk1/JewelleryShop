import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import React from "react";
import ProductForm from "./component/productForm";
import { categories_category, products_product } from "@prisma/client";

const ProductPage = async ({
  params,
}: {
  params: {
    userId: string;
    productId: string;
  };
}) => {
  const categories = (await prismadb.categories_category.findMany(
    {}
  )) as categories_category[];
  const productData =
    params.productId === "new"
      ? null
      : ((await prismadb.products_product.findUnique({
          where: {
            id: parseInt(params?.productId),
          },
        })) as products_product);
  return (
    <main className="h-screen flex flex-col p-10">
      <ProductForm initialData={productData} categories={categories} />
    </main>
  );
};

export default ProductPage;
