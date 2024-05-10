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
    <div className="bg-gray-50 rounded-xl overflow-hidden p-3">
      <div className="w-full overflow-hidden rounded-lg bg-gray-200">
        <Link href={`/jewellery/${product?.id}`}>
          <Image
            alt="Earrings"
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
            height={400}
            src={item.prod_image_url}
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width={400}
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between w-full">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
              {item.prod_title}
            </h3>
            <Button
              variant="outline"
              className="w-max h-max"
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
            >
              <Heart
                className={twMerge("w-5 md:w-6 h-5 md:h-6 border-none")}
                fill={isWishlist ? "red" : "none"}
                color={isWishlist ? "red" : "black"}
              />
            </Button>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.prod_desc}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-900 font-medium">{`RS. ${item.prod_price}`}</span>
          </div>
          <Button
            className="w-full mt-2"
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
    </div>
  );
};

export default ProductCard;
