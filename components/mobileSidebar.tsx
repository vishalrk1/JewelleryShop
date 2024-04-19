"use client";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

import logo from "@/public/assets/Logo Gold.png";
import Image from "next/image";

interface Props {
  pending?: boolean;
  routes: any[];
}

export const MobileSidebar: React.FC<Props> = ({ pending = false, routes }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col items-center p-2 w-[300px] sm:w-[440px]"
      >
        <div className="flex items-center justify-center h-1/6 w-full bg-gray-100 rounded-lg">
          <Image
            src={logo}
            alt="illusion-logo"
            className="h-24 w-24 object-contain p-4 relative"
          />
        </div>
        {pending && "Loading..."}
        <div className="flex flex-col gap-1 w-full">
          <p className="py-0 text-left mb-1">Categories</p>
          {routes?.map((route) => (
            <SheetClose asChild>
              <Button
                className="w-full p-2"
                variant="secondary"
                onClick={() => {
                  router.push(route.href);
                }}
              >
                <p className="text-black">{route.label}</p>
              </Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
