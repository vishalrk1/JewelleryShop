"use client";
import { RootState } from "@/redux/store/store";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { showErrorToast } from "@/utils/toasts";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Loader from "../Loader";

// import AddressDropdown from "./AddressDropdown";

const CheckoutCard = () => {
  const { user, userData } = useSelector((state: RootState) => state.auth);
  const { cart, cartItems } = useSelector((state: RootState) => state.cart);
  const [addressId, setAddressId] = useState<null | string>(null);
  const [phone, setPhone] = useState("");
  const [cartValue, setCartValue] = useState(0);
  const [convenienceFee, setConvenienceFee] = useState(150);
  const [loading, setLoading] = useState(false);

  console.log(uuidv4())

  useEffect(() => {
    if (cartItems?.length > 0) {
      let cartTotal = cartItems.reduce((acc, item) => {
        return acc + item?.products_product?.prod_price * item?.quantity;
      }, 0);
      setCartValue(cartTotal);
      if (cartTotal > 1000) {
        setConvenienceFee(0);
      } else {
        setConvenienceFee(150);
      }
    }
  }, [cartItems]);

  useEffect(() => {
    setAddressId(userData?.main_useraddress[0].id);
  }, [userData]);

  const handelCheckout = async () => {
    try {
      setLoading(true);
      const orderId = uuidv4();
      const res = await axios.post(
        `http://localhost:3000/api/orders/${orderId}/checkout`,
        {},
        {
          params: {
            userId: user?.id,
            email: user?.email,
            cartId: cart?.id,
            addressId: userData?.main_useraddress[0].id,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        window.location.assign(res.data.url);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      showErrorToast("Something went wrong cant procced order right now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="email"
                type="text"
                id="username"
                placeholder="Full name on card"
                value={`${user?.first_name} ${user?.last_name}`}
                readOnly
                disabled
              />
            </div>
            {user && (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="text"
                  id="username"
                  placeholder={user?.email}
                  disabled
                />
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              name="phone"
              type="text"
              id="phone"
              placeholder={userData?.user_phone}
              disabled
            />
          </div>
          {addressId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {
                    userData?.main_useraddress.find(
                      (address: any) => address.id === addressId
                    )?.address_type
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mx-2 md:w-full">
                <DropdownMenuLabel>Choose Address</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={addressId}
                  onValueChange={setAddressId}
                >
                  {userData?.main_useraddress.map((address: any) => (
                    <DropdownMenuRadioItem
                      value={address.id}
                      className="hover:cursor-pointer"
                    >
                      {`${address.address_type} - ${address.address_line1}`}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <p>Cart Total</p>
            <p>{cartValue}</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <p>Convenience Fee</p>
            <p>{convenienceFee}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 font-medium">
            <p>Order Total</p>
            <p>{convenienceFee + cartValue}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={() => handelCheckout()}
            className="w-full"
            disabled={loading}
          >
            {loading && (
              <Loader className="w-4 h-4 border-2 mx-2" color="border-gray-100" />
            )}
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutCard;
