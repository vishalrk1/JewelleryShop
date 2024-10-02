"use client";
import React from "react";
import { Trash, TriangleAlert } from "lucide-react";
import { ICartItem } from "@/lib/types";
import useAuthStore from "@/hooks/useAuthStore";
import useCartStore from "@/hooks/useCartStore";
import Image from "next/image";
import { showErrorToast } from "@/utils/toasts";
import QuantityButton from "../buttons/QuantityButton";

interface Props {
  item: ICartItem;
}

const CartItamCard: React.FC<Props> = ({ item }) => {
  const { token } = useAuthStore();
  const { removeItemFromCart } = useCartStore();

  return (
    <div className="w-full h-max flex mt-3 items-center md:mt-5 rounded-lg shadow-md">
      <div className="flex items-center justify-center p-2">
        <div className="relative w-20 h-20 md:w-32 md:h-32">
          <Image
            src={item.product?.images[0]}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            alt={item.product.title || "Product image"}
          />
        </div>
      </div>
      <div className="w-full p-2 flex my-2">
        <div className="flex flex-col w-full items-centerc justify-center">
          <div className="text-base md:text-xl font-bold">
            {item.product.title}
          </div>
          <div className="hidden md:block">
            <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
              {item.product.description}
            </p>
          </div>
          {item.product.stockQuantity === 0 && (
            <div className="flex flex-row gap-2 items-center bg-destructive/15 p-2 rounded-md my-1 w-max">
              <TriangleAlert className="hidden md:block h-4 w-4 text-orange-500" />
              <p className="text-orange-500 text-xs md:text-sm">
                Item is not available in stock
              </p>
            </div>
          )}
          <div className="flex w-full items-start mt-1 md:mt-2 divide-x divide-solid divide-gray-400">
            <div className="text-gray-600 font-bold text-sm md:text-base">
              {`${item.product.price}`}
            </div>
            <button
              className="flex gap-1 mx-2 items-center justify-center cursor-pointer"
              onClick={() => {
                token
                  ? removeItemFromCart(item.product._id, token)
                  : showErrorToast("Please login to continue shopping");
              }}
            >
              <Trash size={20} className="text-red-400 ml-2" />
              <p className="text-red-400 text-xs md:text-sm">Remove</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-max rounded-lg items-center justify-center gap-1">
          <QuantityButton item={item} />
        </div>
      </div>
    </div>
  );
};

export default CartItamCard;
