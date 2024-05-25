"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/redux/store/store";
import { Mail, Phone, SquarePen, User2Icon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user, userData } = useSelector((state: RootState) => state.auth);
  if (!user) return redirect("/");

  return (
    <main className="flex flex-col lg:flex-row justify-center lg:h-screen gap-4 mx-auto max-w-8xl mt-4 md:mt-6 px-4 md:px-12 mb-8">
      <section className="flex flex-1 flex-col gap-2 items-end w-full">
        <div className="w-full sm:h-1/2 aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={userData?.user_pfp_url}
            alt={`${user.username}'s profile picture}`}
            fill
            objectFit="cover"
            className="aspect-square rounded-2xl p-2 pointer-events-none"
          />
        </div>
        {/* <Link href="/updateProfile" className="w-full"> */}
        <Button variant="default" className="flex gap-3 w-full">
          <SquarePen className="w-4 h-4" />
          Edit Profile
        </Button>
        {/* </Link> */}
      </section>
      <section className="flex-2 w-full gap-4">
        <h1 className="text-2xl font-semibold p-4">Personal Information</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-xl items-center flex gap-2 font-medium">
                <User2Icon />
                Username
              </CardTitle>
              <CardDescription className="text-xl font-normal overflow-clip">
                {user?.username}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-xl items-center flex gap-2 font-medium">
                <Mail />
                Email
              </CardTitle>
              <CardDescription className="text-lg font-normal overflow-clip line-clamp-1">
                {user?.email}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle className="text-xl items-center flex gap-2 font-medium">
                <Phone />
                Contact Number
              </CardTitle>
              <CardDescription className="text-lg font-normal overflow-clip line-clamp-1">
                {userData?.user_phone}
              </CardDescription>
            </CardHeader>
          </Card>
          {user?.is_staff && (
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
          )}
        </div>
        <div className="flex items-center p-4 mt-4">
          <h1 className="text-2xl font-semibold">Your Addresses</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {userData?.main_useraddress.map((item: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg items-center flex gap-2 font-medium">
                  {item.address_type}
                </CardTitle>
                <CardDescription className="items-center">
                  {item.address_line1}, {item.address_line2}, {item.city},
                  {item.state}, {item.country}, {item.postal_code}
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
