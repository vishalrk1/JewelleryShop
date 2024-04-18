"use client";
import { getCart } from "@/redux/store/cart/action";
import { RootState } from "@/redux/store/store";
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

  useEffect(() => {
    if (!cart && user) {
      const id = user?.id;
      const email = user?.email;
      dispatch(getCart({ id, email }));
    }
  }, []);
  return <>{children}</>;
};

export default ProductsPageLayout;
