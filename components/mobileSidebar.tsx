"use client";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
        className="flex flex-col items-center p-0 w-[300px] sm:w-[440px]"
      >
        <div className="flex items-center justify-center h-1/6 w-full bg-gray-100">
          <Image
            src={logo}
            alt="illusion-logo"
            className="h-32 w-32 object-contain p-4 relative"
          />
        </div>
        {pending && "Loading..."}
        {routes?.map((route) => (
          <button
            key={route.href}
            onClick={() => router.push(route.href)}
            className={cn(
              "w-full items-center m-1 p-1 border- rounded-lg shadow-sm bg-white hover:bg-gray-100 transition",
              route.active
                ? "text-black dark:text-white bg-gray-50"
                : "text-muted-foreground"
            )}
          >
            <span>{route.label}</span>
          </button>
        ))}
      </SheetContent>
    </Sheet>
  );
};
