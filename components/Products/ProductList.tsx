"use client";
import React from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { products_product } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

interface Props {
  productsData: products_product[];
  currentTab: string;
}

const ProductList: React.FC<Props> = ({ productsData, currentTab }) => {
  return (
    <TabsContent
      value={currentTab}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {productsData?.map((product) => {
        return (
          <div className="bg-background group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
              <Image
                src={product.prod_image_url}
                alt={product.prod_title}
                fill
                objectFit="cover"
                className="aspect-square object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between space-y-1">
              <div className="flex justify-between items-start space-x-2">
                <p className="md:w-3/4 text-sm md:text-lg font-semibold">
                  {product.prod_title}
                </p>
                <Heart className="hidden md:block w-6 h-6" />
              </div>
              <p className="hidden md:block text-xs text-gray-500">
                {product.prod_desc}
              </p>
              <p className="text-xs md:text-sm">{`Rs. ${product.prod_price}`}</p>
              <Button className="w-full my-2 text-xs md:text-base px-4">
                Add to Cart
              </Button>
            </div>
          </div>
        );
      })}
    </TabsContent>
  );
};

export default ProductList;
