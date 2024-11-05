import useAuthStore from "@/hooks/useAuthStore";
import useCartStore from "@/hooks/useCartStore";
import { ICartItem } from "@/lib/types";
import { showErrorToast } from "@/utils/toasts";
import React from "react";
import Loader from "../Loader";

interface Props {
  item?: ICartItem;
}

const QuantityButton: React.FC<Props> = ({ item }) => {
  const { token } = useAuthStore();
  const { updateCartItemQuantity, fetching } = useCartStore();

  const handeQuantityCHange = (change: number) => {
    if (!item) {
      return;
    }
    const quantity = item.quantity + change;
    if (quantity < 0) {
      return;
    }
    token
      ? updateCartItemQuantity(item.product._id, quantity, token)
      : showErrorToast("Please login to continue shopping");
  };

  if (!item) {
    return null;
  }

  return (
    <>
      <button
        className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base bg-gray-100 rounded-md"
        onClick={() => handeQuantityCHange(1)}
        disabled={fetching}
      >
        +
      </button>
      <div className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base rounded-md">
        {item.quantity}
      </div>
      <button
        className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base bg-gray-100 rounded-md"
        onClick={() => handeQuantityCHange(-1)}
        disabled={fetching}
      >
        -
      </button>
    </>
  );
};

export default QuantityButton;
