"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAddressStore from "@/hooks/useAddressStore";
import useAuthStore from "@/hooks/useAuthStore";
import useUserStore from "@/hooks/useUserStore";
import { IAddress } from "@/lib/types";
import {
  ChevronRight,
  LucideIcon,
  Mail,
  Phone,
  SquarePen,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const { token } = useAuthStore();
  const { user, fetching } = useUserStore();
  const { addresses } = useAddressStore();
  const router = useRouter();

  useEffect(() => {
    if (!user && !fetching) router.replace("/");
  }, [user, fetching, router]);

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

  const redirectTODashboard = async () => {
    try {
      const response = await fetch("/api/setCookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        router.push(`/${user?._id}/dashboard`);
      } else {
        console.error("Failed to set auth cookie");
      }
    } catch (error) {
      console.error("Error setting auth cookie:", error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row lg:justify-center gap-4 mx-auto max-w-8xl mt-4 md:mt-6 px-4 md:px-12 mb-8">
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
        <div className="w-full flex items-center justify-between mb-2">
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
            <Card
              className="p-3 cursor-pointer hover:-translate-y-1 transition-all duration-300"
              key={item.label}
            >
              <div className="h-max flex flex-row items-center gap-2">
                <div className="bg-slate-200 rounded-full p-2">
                  <item.icon size={24} />
                </div>
                <div className="flex flex-col justify-start">
                  <p className="text-sm text-black font-semibold">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600 my-0">{item.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="w-full flex flex-row items-center">
          {user?.role === "admin" && (
            <Card className="w-max px-6 p-3 mt-3 cursor-pointer hover:-translate-y-1 transition-all duration-300">
              <div className="h-max flex flex-row items-center gap-2">
                <div className="flex flex-col gap-2 justify-start">
                  <p className="flex items-center gap-3 text-sm text-black font-semibold">
                    Admin Access
                    <Badge className="bg-green-400 text-slate-600">
                      Granted
                    </Badge>
                  </p>
                  <Button
                    variant="secondary"
                    className="flex gap-1 py-1 w-full group"
                    onClick={redirectTODashboard}
                  >
                    Visit Dashboard
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
        <div className="w-full flex items-center justify-between mt-6">
          <h1 className="text-xl font-bold py-2">Your Addresses</h1>
          <Link href="/profile/address/new" className="w-max">
            <Button variant="secondary" className="flex gap-1 w-full group">
              Add New Address
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full mt-2">
          {addresses?.map((item: IAddress) => (
            <Card
              key={item._id}
              className="relative hover:scale-105 transition-all duration-300 group"
            >
              <CardHeader className="space-y-0">
                <CardTitle className="text-base items-center flex font-medium">
                  {item.address_type}
                </CardTitle>
                <CardDescription className="items-start flex flex-col">
                  <p>{`${item.address_line1} ${
                    item.address_line2 ? item.address_line2 : ""
                  }`}</p>
                  <p>
                    {item.city}, {item.postal_code}
                  </p>
                  <p>{item.country}</p>
                </CardDescription>
              </CardHeader>
              <Button
                variant="link"
                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-0 right-0"
                onClick={() => {
                  router.push(`/profile/address/${item._id}`);
                }}
              >
                Edit Address
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
