"use client";

import { RootState } from "@/redux/store/store";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { logoutUser } from "@/redux/store/auth/action";
import Link from "next/link";
import UserDropdown from "./userDetails";
import { Heart, ShoppingCart } from "lucide-react";
import IconButton from "../buttons/IconButton";

const AuthButtons = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { user, userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="flex items-center justify-center">
      {user ? (
        <div className="flex items-center justify-center gap-4">
          {userData ? (
            <>
              <IconButton
                href="/cart"
                icon={<ShoppingCart className="w-5 h-5" />}
                label="Your Cart"
                className="flex items-center"
              />
              <IconButton
                href="/wishlist"
                icon={<Heart className="w-5 h-5" />}
                label="Your wishlist"
                className="hidden md:flex items-center"
              />
              <UserDropdown
                user={user}
                userData={userData}
                is_staff={user?.is_staff}
              />
            </>
          ) : (
            <Link href="/updateProfile">
              <Button className="text-xs md:text-base">Finish Profile</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button className="text-xs md:text-base">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="text-xs md:text-base">Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
