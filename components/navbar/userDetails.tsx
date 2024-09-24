"use client";
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
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/types";

interface Props {
  user: IUser;
  is_staff: boolean;
}

const UserDropdown: React.FC<Props> = ({ user, is_staff }) => {
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
            src={user?.image}
            width={40}
            height={40}
            alt="Avatar"
            className="overflow-hidden rounded-full object-cover pointer-events-none"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* {is_staff && (
          <>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/${user?._id}/dashboard`);
              }}
            >
              Admin Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )} */}
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
        <DropdownMenuItem
          onClick={() => {
            router.push("/contact");
          }}
        >
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handelLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
