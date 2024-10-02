import { showErrorToast } from "@/utils/toasts";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import Link from "next/link";
import { IProduct } from "@/lib/types";
import QuantityButton from "../buttons/QuantityButton";

// zustand store hooks
import useWishlistStore from "@/hooks/useWishlistStore";
import useUserStore from "@/hooks/useUserStore";
import useAuthStore from "@/hooks/useAuthStore";
import useCartStore from "@/hooks/useCartStore";

interface ProductCardProps {
  item: IProduct;
  isWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, isWishlist }) => {
  const { token } = useAuthStore();
  const { user } = useUserStore();
  const { addItemToCart, isProductInCart, cart } = useCartStore();
  const { deleteWishlistItem, isProductInWishlist, addItemToWishlist } =
    useWishlistStore();

  const product = item;
  const isWishlisted = isProductInWishlist(item._id.toString());
  const isInCart = isProductInCart(item._id.toString());
  const cartItem = cart?.items.find((item) => item.product._id === product._id);
  const isInStock = item.stockQuantity > 0;

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
    <div className="bg-gray-50 rounded-xl overflow-hidden p-3">
      <div className="w-full overflow-hidden rounded-lg bg-gray-200">
        <Link href={`/jewellery/${product?._id}`}>
          <Image
            alt="Earrings"
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-none"
            height={400}
            src={product?.images[0]}
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
            <h3 className="text-sm md:text-lg font-bold text-gray-900 line-clamp-1">
              {product.title}
            </h3>
            <Heart
              className={twMerge("w-14 md:w-16 h-6 border-none cursor-pointer")}
              onClick={() => {
                user && token
                  ? handelBtnAction(product._id.toString(), token)
                  : showErrorToast("Please login to continue shopping");
              }}
              fill={isWishlisted ? "red" : "none"}
              color={isWishlisted ? "red" : "black"}
            />
          </div>
          <p className="hidden md:block mt-1 h-8 text-xs text-gray-500 line-clamp-2">
            {product?.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-900 font-medium">{`RS. ${product?.price}`}</span>
          </div>
          {!isInCart ? (
            <Button
              className="w-full mt-2"
              variant={isInStock ? "default" : "secondary"}
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
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          ) : (
            <div className="flex flex-row-reverse items-center justify-between mt-2 w-full p-1 border-2 border-solid border-gray-200 rounded-lg">
              <QuantityButton item={cartItem} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
