"use client";
import React, { useEffect } from "react";
import axios from "axios";
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
import Image from "next/image";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import Loader from "@/components/Loader";
import { handelAddToCart, handelAddToWishlist } from "@/utils/ProductsFunction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { products_product } from "@/prisma/generated/client";
import { IProduct } from "@/lib/types";

interface Props {
  params: { productId: string };
}

const IndividualProductPage: React.FC<Props> = ({ params }) => {
  const prodId = params.productId;
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart, fetching: cartLoading } = useSelector(
    (state: RootState) => state.cart
  );
  const { wishlist, fetching: wishlistLoading } = useSelector(
    (state: RootState) => state.wishlist
  );
  const dispatch = useDispatch() as any;
  let prod_instock: boolean = product ? product?.stockQuantity > 1 : false;

  useEffect(() => {
    async function getIndividualProduct(productId: string): Promise<void> {
      try {
        const res = await axios.get<{ message: string; data: IProduct }>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}`
        );

        if (res.status === 200) {
          setProduct(res.data.data);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
      }
    }
    getIndividualProduct(prodId);
  }, [prodId]);

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-start gap-2 p-3">
      {!isLoading ? (
        <>
          <section className="flex-1 w-full">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-semibold">
                  Product Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 items-center justify-center">
                  {product && (
                    <Image
                      src={product.images[0]}
                      alt=""
                      className="rounded-md object-cover pointer-events-none"
                      height={400}
                      width={400}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
          <section className="flex-1 text-white w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-semibold">
                  {product?.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {product?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-4">
                  <Badge
                    className={twMerge(
                      "rounded-md",
                      prod_instock && "bg-green-500"
                    )}
                    variant={prod_instock ? "default" : "secondary"}
                  >
                    {prod_instock ? "Available" : "Out of stock"}
                  </Badge>
                  <p className="text-lg">{`Price: ${product?.price}`}</p>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-2 my-3 w-full items-center">
              <Card
                className="w-full cursor-pointer"
                onClick={() =>
                  !cartLoading &&
                  handelAddToCart({
                    cart_id: Number(cart?.id),
                    product_id: Number(product?._id),
                    user: user,
                    dispatch: dispatch,
                  })
                }
              >
                <CardHeader className="flex flex-row items-center justify-center gap-4">
                  {cartLoading ? (
                    <Loader className="h-7 w-7" />
                  ) : (
                    <>
                      <ShoppingCart className="w-7 h-7" />
                      <p className="text-base">Add to Cart</p>
                    </>
                  )}
                </CardHeader>
              </Card>
              <Card
                className="h-full cursor-pointer"
                onClick={() =>
                  product && wishlist && !wishlistLoading
                    ? handelAddToWishlist({
                        wishlist_id: wishlist.id.toString(),
                        product_id: product._id.toString(),
                        user: user,
                        dispatch: dispatch,
                      })
                    : showErrorToast("Please Try Again later")
                }
              >
                <CardHeader className="flex flex-col items-center justify-center gap-2">
                  {wishlistLoading ? (
                    <Loader className="h-7 w-7" />
                  ) : (
                    <Heart className="w- 7h-7" />
                  )}
                </CardHeader>
              </Card>
            </div>
          </section>
        </>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader className="h-12 w-12" />
        </div>
      )}
    </main>
  );
};

export default IndividualProductPage;
