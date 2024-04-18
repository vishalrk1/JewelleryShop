"use client";
import React, { useEffect } from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { products_product, products_wishlist } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItemTOCart } from "@/redux/store/cart/action";
import { RootState } from "@/redux/store/store";
import { twMerge } from "tailwind-merge";
import { deleteWishlistItem } from "@/redux/store/wishlist/action";
import { showErrorToast } from "@/utils/toasts";

interface Props {
  productsData: any[];
  currentTab: string;
  isWishlist?: boolean;
}

const ProductList: React.FC<Props> = ({
  productsData,
  currentTab,
  isWishlist = false,
}) => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  const handelAddToCart = ({
    cart_id,
    product_id,
  }: {
    cart_id: number;
    product_id: number;
  }) => {
    console.log(!user);
    if (!user) {
      showErrorToast("Please login to add items to cart");
    } else {
      dispatch(addItemTOCart({ cart_id, product_id }));
    }
  };

  const handelRemoveSavedItem = ({
    id,
    wishlist_id,
    product_id,
  }: {
    id: string;
    wishlist_id: string;
    product_id: string;
  }) => {
    console.log("id", id, "wishlist_id", wishlist_id, "product_id", product_id);
    dispatch(
      deleteWishlistItem({
        id,
        wishlist_id,
        product_id,
      })
    );
  };

  return (
    <TabsContent
      value={currentTab}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {productsData?.map((item) => {
        const product = isWishlist
          ? (item?.product as products_product)
          : (item as products_product);
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
                <p className="md:w-4/5 text-sm md:text-base font-semibold line-clamp-1">
                  {product.prod_title}
                </p>
                <Heart
                  className={twMerge(
                    "w-6 h-6 border-none",
                    !isWishlist && "hidden md:block"
                  )}
                  fill={isWishlist ? "red" : "none"}
                  color={isWishlist ? "red" : "black"}
                  onClick={() =>
                    isWishlist && wishlist
                      ? handelRemoveSavedItem({
                          id: item?.id,
                          wishlist_id: wishlist.id.toString(),
                          product_id: product.id.toString(),
                        })
                      : () => {}
                  }
                />
              </div>
              {/* <p className="hidden md:block text-xs text-gray-500 line-clamp-1">
                {product.prod_desc}
              </p> */}
              <p className="text-xs md:text-sm">{`Rs. ${product.prod_price}`}</p>
              <Button
                className="w-full my-2 text-xs md:text-base px-4"
                onClick={() =>
                  handelAddToCart({
                    cart_id: Number(cart?.id),
                    product_id: Number(product.id),
                  })
                }
              >
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
