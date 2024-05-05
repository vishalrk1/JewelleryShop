import { addItemTOCart } from "@/redux/store/cart/action";
import { RootState } from "@/redux/store/store";
import {
  addItemToWishlist,
  deleteWishlistItem,
} from "@/redux/store/wishlist/action";
import { showErrorToast } from "@/utils/toasts";
import { products_product } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProductCardProps {
  item: any;
  isWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, isWishlist }) => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  const product = isWishlist
    ? (item?.product as products_product)
    : (item as products_product);

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
    dispatch(
      deleteWishlistItem({
        id,
        wishlist_id,
        product_id,
      })
    );
  };

  const handelAddToWishlist = ({
    wishlist_id,
    product_id,
  }: {
    wishlist_id: string;
    product_id: string;
  }) => {
    if (!user) {
      showErrorToast("Please login to add items to wishlist");
    } else {
      dispatch(
        addItemToWishlist({
          wishlist_id,
          product_id,
        })
      );
    }
  };
  return (
    <div className="bg-background group cursor-pointer rounded-xl border p-3 space-y-2 h-full">
      <Link href={`/jewellery/${product?.id}`}>
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={product.prod_image_url}
            alt={product.prod_title}
            fill
            objectFit="cover"
            className="aspect-square object-cover rounded-md"
          />
        </div>
      </Link>
      <div className="flex justify-between items-start">
        <div className="flex items-center justify-start w-full">
          <p className="text-xs md:text-base font-semibold line-clamp-2">
            {product.prod_title}
          </p>
        </div>
        <div className="flex items-center justify-end w-1/5">
          <Heart
            className={twMerge("w-5 md:w-6 h-5 md:h-6 border-none")}
            fill={isWishlist ? "red" : "none"}
            color={isWishlist ? "red" : "black"}
            onClick={() => {
              user && wishlist
                ? isWishlist
                  ? handelRemoveSavedItem({
                      id: item?.id,
                      wishlist_id: wishlist.id.toString(),
                      product_id: product.id.toString(),
                    })
                  : handelAddToWishlist({
                      wishlist_id: wishlist?.id.toString(),
                      product_id: product.id.toString(),
                    })
                : showErrorToast("Please login");
            }}
          />
        </div>
      </div>
      {/* <div className="hidden md:block min-h-max">
        <p className="text-sm text-gray-500 line-clamp-2">
        {product.prod_desc}
        </p>
      </div> */}
      <div className="flex flex-col items-start justify-end">
        <p className="text-sm md:text-base">{`Rs. ${product.prod_price}`}</p>
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
};

export default ProductCard;
