"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import UserDropdown from "./userDetails";
import { Heart, ShoppingCart } from "lucide-react";
import IconButton from "../buttons/IconButton";
import useAuthStore from "@/hooks/useAuthStore";
import useUserStore from "@/hooks/useUserStore";

const AuthButtons = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { checkAuth } = useAuthStore();
  const { user } = useUserStore();
  useEffect(() => {
    checkAuth();
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className="flex items-center justify-center">
      {user ? (
        <div className="flex items-center justify-center gap-4">
          {user.isProfileComplete ? (
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
              <UserDropdown user={user} is_staff={false} />
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
