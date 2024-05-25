"use client"
import Container from "@/components/ui/Container";
import { RootState } from "@/redux/store/store";
import { getWishlist } from "@/redux/store/wishlist/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface WishlistLayoutProps {
  children: React.ReactNode;
}

const WishlistLayout: React.FC<WishlistLayoutProps> = ({ children }) => {
  const { user, userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (user) {
      dispatch(getWishlist({ user_id: user.id }));
    }
  }, []);
  return <Container>{children}</Container>;
};

export default WishlistLayout;
