"use client";
import React, { useCallback, useEffect } from "react";
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
import { showErrorToast } from "@/utils/toasts";
import Loader from "@/components/Loader";
import { IProduct } from "@/lib/types";
import useProductStore from "@/hooks/useProductStore";
import { useRouter } from "next/navigation";
import useCartStore from "@/hooks/useCartStore";
import useWishlistStore from "@/hooks/useWishlistStore";
import useUserStore from "@/hooks/useUserStore";
import useAuthStore from "@/hooks/useAuthStore";
import QuantityButton from "@/components/buttons/QuantityButton";

interface Props {
  params: { productId: string };
}

const IndividualProductPage: React.FC<Props> = ({ params }) => {
  const prodId = params.productId;
  const { token } = useAuthStore();
  const { user } = useUserStore();
  const { products, fetching } = useProductStore();
  const {
    cart,
    fetching: cartFetching,
    isProductInCart,
    addItemToCart,
  } = useCartStore();
  const {
    fetching: wishlistFetching,
    isProductInWishlist,
    addItemToWishlist,
    deleteWishlistItem,
  } = useWishlistStore();
  const [product, setProduct] = React.useState<IProduct | null>(null);

  let isInStock = product ? product?.stockQuantity > 0 : false;
  let isWishlisted = product && isProductInWishlist(product._id.toString());
  let isInCart = product && isProductInCart(product._id.toString());
  const cartItem = cart?.items.find(
    (item) => item.product._id === product?._id
  );
  const router = useRouter();

  useEffect(() => {
    const prod = products?.find((item) => item._id === prodId);
    if (prod) {
      setProduct(prod);
    } else {
      router.back();
    }
  }, [products]);

  const handelBtnAction = useCallback(
    (productId: string, token: string) => {
      // if user is not logged in show error toast
      if (!user) {
        showErrorToast("Please login");
        return;
      }

      // if user is logged in add or remove product from wishlist
      if (isWishlisted) {
        deleteWishlistItem(productId, token);
      } else {
        addItemToWishlist(productId, token);
      }
    },
    [user, isWishlisted, deleteWishlistItem, addItemToWishlist]
  );

  const handelCartBtn = useCallback(
    (productId: string, quantity: number, token: string) => {
      if (isInCart) {
        return;
      } else {
        addItemToCart(productId, quantity, token);
      }
    },
    [isInCart, addItemToCart]
  );

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-start gap-2 p-3">
      {!fetching && product ? (
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
                      isInStock && "bg-green-500"
                    )}
                    variant={isInStock ? "default" : "secondary"}
                  >
                    {isInStock ? "Available" : "Out of stock"}
                  </Badge>
                  <p className="text-lg">{`Price: ${product?.price}`}</p>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-2 my-3 w-full items-center">
              {!isInCart ? (
                <Card
                  className="w-full cursor-pointer"
                  onClick={() => {
                    if (isInStock && token) {
                      handelCartBtn(product._id, 1, token);
                    } else if (isInStock && !token) {
                      showErrorToast("Please login to continue shopping");
                    } else if (!isInStock) {
                      return;
                    }
                  }}
                >
                  <CardHeader
                    className={twMerge(
                      "flex flex-row items-center justify-center gap-4",
                      !isInStock && "bg-gray-100"
                    )}
                  >
                    {cartFetching ? (
                      <Loader className="h-7 w-7" />
                    ) : (
                      <>
                        <ShoppingCart className="w-7 h-7" />
                        {isInStock ? "Add to Cart" : "Out of Stock"}
                      </>
                    )}
                  </CardHeader>
                </Card>
              ) : (
                <Card className="w-full flex flex-row-reverse items-center h-full px-4 py-5">
                  <QuantityButton item={cartItem} />
                </Card>
              )}
              <Card
                className="h-full cursor-pointer"
                onClick={() => {
                  user && token
                    ? handelBtnAction(product._id.toString(), token)
                    : showErrorToast("Please login to continue shopping");
                }}
              >
                <CardHeader className="flex flex-col items-center justify-center gap-2">
                  {wishlistFetching ? (
                    <Loader className="h-7 w-7" />
                  ) : (
                    <Heart
                      className={twMerge(
                        "w-14 md:w-16 h-6 border-none cursor-pointer"
                      )}
                      fill={isWishlisted ? "red" : "none"}
                      color={isWishlisted ? "red" : "black"}
                    />
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
