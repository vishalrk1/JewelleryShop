"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAddressStore from "@/hooks/useAddressStore";
import useUserStore from "@/hooks/useUserStore";
import { IAddress } from "@/lib/types";
import { LucideIcon, Mail, Phone, SquarePen, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  const { user } = useUserStore();
  const { addresses } = useAddressStore();

  let UserDatailData: {
    label: string;
    icon: LucideIcon;
    value: string | undefined;
  }[] = [
    {
      label: "Username",
      icon: User2Icon,
      value: `${user?.first_name} ${user?.last_name ? user?.last_name : ""}`,
    },
    {
      label: "Email",
      icon: Mail,
      value: user?.email,
    },
    {
      label: "Contact Number",
      icon: Phone,
      value: user?.phone,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col lg:flex-row justify-center h-full gap-4 mx-auto max-w-8xl mt-4 md:mt-6 px-4 md:px-12 mb-8">
      <section className="hidden lg:flex flex-1 flex-col gap-2 items-end w-full">
        <div className="w-full aspect-square rounded-xl bg-gray-100 relative">
          {user ? (
            <Image
              src={user?.image}
              alt={`${user.first_name}'s profile picture}`}
              fill
              objectFit="cover"
              className="aspect-square rounded-2xl p-2 pointer-events-none"
            />
          ) : (
            <Skeleton className="aspect-square rounded-2xl" />
          )}
        </div>
        <Link href="/updateProfile" className="w-full">
          <Button variant="default" className="flex gap-3 w-full">
            <SquarePen className="w-4 h-4" />
            Edit Profile
          </Button>
        </Link>
      </section>
      <section className="flex-2 w-full gap-4 px-3">
        <div className="w-full flex items-center justify-between">
          <h1 className="md:text-2xl font-bold py-2">Personal Information</h1>
          <Link href="/updateProfile" className="block lg:hidden w-max">
            <Button variant="default" className="flex gap-3 w-full">
              <SquarePen className="w-4 h-4" />
              Edit Profile
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
          {UserDatailData.map((item, index) => (
            <Card className="p-3 hover:-translate-y-1 transition-all duration-300">
              <div className="h-max flex flex-row items-center gap-2">
                <div className="bg-slate-200 rounded-full p-2">
                  <item.icon size={24} />
                </div>
                <div className="flex flex-col justify-start">
                  <p className="text-sm text-black font-semibold">
                    {item.label}
                  </p>
                  <p className="text-base text-gray-600 my-0">{item.value}</p>
                </div>
              </div>
            </Card>
          ))}
          {/* {user?.is_staff && (
            <Card className="">
              <CardHeader>
                <CardTitle className="text-xl items-center flex gap-2 font-medium">
                  Admin Access
                  <Badge className="bg-green-400 text-slate-600">Granted</Badge>
                </CardTitle>
                <CardDescription className="text-lg font-normal overflow-clip line-clamp-1">
                  <Button variant="secondary">Visit Dashboard</Button>
                </CardDescription>
              </CardHeader>
            </Card>
          )} */}
        </div>
        <div className="flex items-center py-4 mt-2">
          <h1 className="text-xl font-semibold">Your Addresses</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {addresses?.map((item: IAddress, index: number) => (
            <Card
              key={index}
              className="hover:-translate-y-1 transition-all duration-200"
            >
              <CardHeader className="space-y-0">
                <CardTitle className="text-base items-center flex font-medium">
                  {item.address_type}
                </CardTitle>
                <CardDescription className="items-start flex flex-col">
                  <p>{`${item.address_line1} ${
                    item.address_line2 && item.address_line2
                  }`}</p>
                  <p>
                    {item.city}, {item.postal_code}
                  </p>
                  <p>{item.country}</p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
