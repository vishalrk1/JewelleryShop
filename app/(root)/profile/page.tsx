"use client";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user, userData } = useSelector((state: RootState) => state.auth);
  return (
    <main className="flex flex-col sm:flex-row justify-center h-screen gap-4 mx-auto max-w-8xl mt-4 md:mt-6 px-4 md:px-12">
      <section className="flex flex-1 flex-col gap-2 items-end w-full">
        <div className="w-full sm:h-1/2 aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={userData?.user_pfp_url}
            alt={`${user.username}'s profile picture}`}
            fill
            objectFit="cover"
            className="aspect-square rounded-2xl p-2"
          />
        </div>
        <Button variant="default" className="flex gap-3 w-full">
          <SquarePen className="w-4 h-4" />
          Edit Profile
        </Button>
      </section>
      <section className="flex-2 w-full">
        <h1>Profile Page</h1>
      </section>
    </main>
  );
};

export default ProfilePage;
