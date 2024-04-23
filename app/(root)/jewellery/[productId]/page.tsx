"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { products_product } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { twMerge } from "tailwind-merge";
import { Heart, ShoppingCart } from "lucide-react";

interface Props {
  params: { productId: string };
}

const IndividualProductPage: React.FC<Props> = ({ params }) => {
  const prodId = params.productId;
  const [product, setProduct] = React.useState<products_product | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const getProductData = async (prodId: string) => {
    setIsLoading(true);
    const res = await axios.get(`http://localhost:3000/api/products/${prodId}`);
    if (res.status === 200) {
      setProduct(res?.data?.data as products_product);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductData(prodId);
  }, []);

  console.log(product);

  return (
    <main className="flex flex-col md:flex-row items-center gap-2 p-3">
      <section className="flex-1 bg-black text-white">Produce Image</section>
      <section className="flex-1 text-white w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {product?.prod_title}
            </CardTitle>
            <CardDescription className="text-sm">
              {product?.prod_desc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge
              className={twMerge(
                "rounded-md",
                product?.prod_instock && "bg-green-500"
              )}
              variant={product?.prod_instock ? "default" : "secondary"}
            >
              Available
            </Badge>
            <p className="text-lg">{`Price: ${product?.prod_price}`}</p>
          </CardContent>
        </Card>
        <div className="flex gap-2 my-3 w-full items-center">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-center gap-4">
              <ShoppingCart className="w-7 h-7" />
              <p className="text-base">Add to Cart</p>
            </CardHeader>
          </Card>
          <Card className="h-full">
            <CardHeader className="flex flex-col items-center justify-center gap-2">
              <Heart className="w- 7h-7" />
            </CardHeader>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default IndividualProductPage;
