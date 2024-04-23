"use client";
import Container from "@/components/ui/Container";
import { getCart } from "@/redux/store/cart/action";
import { RootState } from "@/redux/store/store";
import { getWishlist } from "@/redux/store/wishlist/action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const ProductsPageLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch<any>();
  const { user, status: userStatus } = useSelector(
    (state: RootState) => state.auth
  );
  const { cart } = useSelector((state: RootState) => state.cart);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    if (!cart && user) {
      const id = user?.id;
      const email = user?.email;
      dispatch(getCart({ id, email }));
    }
    if (!wishlist && user) {
      dispatch(getWishlist({ user_id: user?.id }));
    }
  }, []);

  return <Container>{children}</Container>;
};

export default ProductsPageLayout;
