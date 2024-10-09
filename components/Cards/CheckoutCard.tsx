"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { showErrorToast } from "@/utils/toasts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
import useAuthStore from "@/hooks/useAuthStore";
import useUserStore from "@/hooks/useUserStore";
import useCartStore from "@/hooks/useCartStore";
import useOrderStore from "@/hooks/useOrderStore";
import useAddressStore from "@/hooks/useAddressStore";
import { IAddress } from "@/lib/types";
import { useRouter } from "next/navigation";

// import AddressDropdown from "./AddressDropdown";

const CheckoutCard = () => {
  const { token } = useAuthStore();
  const { user } = useUserStore();
  const { addresses } = useAddressStore();
  const { totalAmount, convenienceFee } = useCartStore();
  const { fetching, creatOrder } = useOrderStore();

  const [address, setAddress] = useState<IAddress | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (addresses) {
      setAddress(addresses[0]);
    }
  }, [addresses]);

  const handelAddressUpdate = (val: string) => {
    const newAddress = addresses.find((item) => item._id === val);
    if (newAddress) {
      setAddress(newAddress);
    }
  };

  const handelCheckout = async () => {
    if (token && address) {
      console.log("Sending the call");
      creatOrder(token, "pending", address).then((data) => {
        if (data) {
          router.replace("/orders");
        }
      });
    } else {
      showErrorToast("Please login to continue shopping");
    }
  };

  return (
    <section className="space-y-6">
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
              placeholder={user?.phone}
              disabled
            />
          </div>
          {addresses && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {address
                    ? `${address.address_type} - ${address.address_line1}`
                    : "Select Address"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mx-2 md:w-full">
                <DropdownMenuLabel>Choose Address</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={address?._id}
                  onValueChange={handelAddressUpdate}
                >
                  {addresses.map((address: IAddress) => (
                    <DropdownMenuRadioItem
                      value={address._id}
                      key={address._id}
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
            <p>{totalAmount}</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-4">
            <p>Convenience Fee</p>
            <p>{convenienceFee}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 font-medium">
            <p>Order Total</p>
            <p>{convenienceFee + totalAmount}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={handelCheckout}
            // onClick={() => {
            //   showErrorToast(
            //     "Cant proceed order right now, please try again later",
            //     true
            //   );
            // }}
            className="w-full"
            disabled={fetching}
          >
            {fetching && (
              <Loader
                className="w-4 h-4 border-2 mx-2"
                color="border-gray-100"
              />
            )}
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CheckoutCard;
