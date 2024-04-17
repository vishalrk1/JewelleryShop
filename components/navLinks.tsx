"use client";
import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  routes: any[];
}

const NavLinks: React.FC<Props> = ({ className, routes }) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes?.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-xs md:text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href
              ? "text-black dark:text-white font-bold"
              : "text-gray-700"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
