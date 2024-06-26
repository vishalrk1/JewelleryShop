"use client";
import React, { useContext, useState } from "react";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/redux/store/cart/action";
import { cart_cartitem, products_product } from "@/prisma/generated/client";

interface Props {
  cartProduct: cart_cartitem;
  product: products_product;
  cartId: string | undefined;
}

const CartItamCard: React.FC<Props> = ({ cartProduct, cartId, product }) => {
  const dispatch = useDispatch<any>();
  const [quantity, setQuantity] = useState(cartProduct?.quantity);
  //   const { removeProductFromCart, updateProductQuantity } =
  //     useContext(CartContext);

  const handleRemoveProductFromCart = () => {
    if (cartId) {
      dispatch(
        deleteCartItem({
          cart_id: cartId,
          cart_item_id: cartProduct.cart_item_id,
        })
      );
    }
  };

  const handleDecreaseQuantity = () => {
    if (!cartId) return;
    if (cartProduct.quantity > 1) {
      dispatch(
        updateCartItem({
          cart_id: cartId,
          cart_item_id: cartProduct.cart_item_id,
          quantity: quantity - 1,
        })
      );
      setQuantity(quantity - 1);
    } else {
      handleRemoveProductFromCart();
    }
  };

  const handleIncreaseQuantity = () => {
    if (!cartId) return;
    dispatch(
      updateCartItem({
        cart_id: cartId,
        cart_item_id: cartProduct.cart_item_id,
        quantity: quantity + 1,
      })
    );
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-full h-max flex mt-3 items-center md:mt-5 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-max h-max p-2">
        <img
          src={product?.prod_image_url}
          className="w-20 md:w-32 h-full md:h-28 object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="w-full p-2 flex my-2">
        <div className="flex flex-col w-full items-centerc justify-center">
          <div className="text-base md:text-xl font-bold">
            {product?.prod_title}
          </div>
          <div className="hidden md:block">
            <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
              {product?.prod_desc}
            </p>
          </div>
          <div className="flex w-full items-start mt-1 md:mt-2 divide-x divide-solid divide-gray-400">
            <div className="text-gray-600 font-bold text-sm md:text-base">
              {`${product?.prod_price}`}
            </div>
            <button
              className="flex gap-1 mx-2 items-center justify-center cursor-pointer"
              onClick={handleRemoveProductFromCart}
            >
              <Trash size={20} className="text-red-400 ml-2" />
              <p className="text-red-400 text-xs md:text-sm">Remove</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-max rounded-lg items-center justify-center gap-1">
          <button
            className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base bg-gray-100 rounded-md"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
          <div className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base rounded-md">
            {quantity}
          </div>
          <button
            className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base bg-gray-100 rounded-md"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItamCard;
