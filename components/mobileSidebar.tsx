"use client";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
        className="flex flex-col items-center p-0 pt-20 w-[300px] sm:w-[440px]"
      >
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
          // <div
          //   key={route.href}
          //   onClick={() => router.push(route.href)}
          //   className={cn(
          //     "font-medium transition-colors hover:text-primary cursor-pointer",
          // route.active
          //   ? "text-black dark:text-white"
          //   : "text-muted-foreground"
          //   )}
          // >
          //   {route.label}
          // </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};
