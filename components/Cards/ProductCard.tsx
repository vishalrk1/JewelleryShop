import { RootState } from "@/redux/store/store";
import { showErrorToast } from "@/utils/toasts";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  handelAddToCart,
  handelAddToWishlist,
  handelRemoveSavedItem,
} from "@/utils/ProductsFunction";
import { products_product } from "@/prisma/generated/client";
import { IProduct } from "@/lib/types";

interface ProductCardProps {
  item: IProduct;
  isWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, isWishlist }) => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  // const product = isWishlist
  //   ? (item?.product as products_product)
  //   : (item as products_product);
  const product = item;

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden p-3">
      <div className="w-full overflow-hidden rounded-lg bg-gray-200">
        <Link href={`/jewellery/${product?._id}`}>
          <Image
            alt="Earrings"
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-none"
            height={400}
            src={product.images[0]}
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
                user && wishlist
                  ? isWishlist
                    ? handelRemoveSavedItem({
                        id: item?._id,
                        wishlist_id: wishlist.id.toString(),
                        product_id: product._id.toString(),
                        dispatch: dispatch,
                      })
                    : handelAddToWishlist({
                        wishlist_id: wishlist?.id.toString(),
                        product_id: product._id.toString(),
                        user: user,
                        dispatch: dispatch,
                      })
                  : showErrorToast("Please login");
              }}
              fill={product.isWishlisted ? "red" : "none"}
              color={product.isWishlisted ? "red" : "black"}
            />
          </div>
          <p className="hidden md:block mt-1 h-8 text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-900 font-medium">{`RS. ${product.price}`}</span>
          </div>
          <Button
            className="w-full mt-2"
            onClick={() =>
              handelAddToCart({
                cart_id: Number(cart?.id),
                product_id: Number(product._id),
                user: user,
                dispatch: dispatch,
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
