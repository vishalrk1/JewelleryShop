import { auth_user } from "@/prisma/generated/client";
import { showErrorToast } from "./toasts";
import { addItemTOCart } from "@/redux/store/cart/action";
import {
  addItemToWishlist,
  deleteWishlistItem,
} from "@/redux/store/wishlist/action";

export const handelAddToCart = ({
  cart_id,
  product_id,
  user,
  dispatch,
}: {
  cart_id: number;
  product_id: number;
  user: auth_user | null;
  dispatch: any;
}) => {
  console.log(!user);
  if (!user) {
    showErrorToast("Please login to add items to cart");
  } else {
    dispatch(addItemTOCart({ cart_id, product_id }));
  }
};

export const handelRemoveSavedItem = ({
  id,
  wishlist_id,
  product_id,
  dispatch,
}: {
  id: string;
  wishlist_id: string;
  product_id: string;
  dispatch: any;
}) => {
  dispatch(
    deleteWishlistItem({
      id,
      wishlist_id,
      product_id,
    })
  );
};

export const handelAddToWishlist = ({
  wishlist_id,
  product_id,
  user,
  dispatch,
}: {
  wishlist_id: string;
  product_id: string;
  user: auth_user | null;
  dispatch: any;
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
