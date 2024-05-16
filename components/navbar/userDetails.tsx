"use client";
import prismadb from "@/lib/prismadb";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/store/auth/action";
import { redirect, useRouter } from "next/navigation";

interface Props {
  user: any;
  userData: any;
  is_staff: boolean;
}

const UserDropdown: React.FC<Props> = ({ user, userData, is_staff }) => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const handelLogout = () => {
    dispatch(logoutUser());
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={userData?.user_pfp_url}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {is_staff && (
          <>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/${user?.id}/dashboard`);
              }}
            >
              Admin Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={() => {
            router.push("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/wishlist");
          }}
        >
          Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/orders");
          }}
        >
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handelLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
