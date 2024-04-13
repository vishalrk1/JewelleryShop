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
}

const ProductList: React.FC<Props> = ({ productsData }) => {
  return (
    <TabsContent
      value="all"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {productsData.map((product) => {
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
            <div className="flex flex-col">
              <div className="flex justify-between items-start space-x-2">
                <p className="w-3/4 text-lg font-semibold">{product.prod_title}</p>
                <Heart className="w-6 h-6"/>
              </div>
              <p>{`Rs. ${product.prod_price}`}</p>
              <Button className="w-full my-2">Add to Cart</Button>
            </div>
          </div>
        );
      })}
    </TabsContent>
  );
};

export default ProductList;
