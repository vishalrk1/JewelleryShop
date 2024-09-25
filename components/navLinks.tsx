"use client";
import useCategoryStore from "@/hooks/useCategoryStore";
import { ICategory, NavRoute } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
  className?: string;
  routes: NavRoute[];
  categories: ICategory[];
}

const NavLinks: React.FC<Props> = ({ className, routes, categories }) => {
  const pathname = usePathname();
  const { setCategory } = useCategoryStore();

  useEffect(() => {
    setCategory(categories);
  }, routes);

  return (
    <nav
      className={cn(
        "hidden md:flex items-center space-x-4 lg:space-x-6",
        className
      )}
    >
      {routes?.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm md:text-base font-medium transition-colors hover:text-primary",
            pathname === route.href
              ? "text-black dark:text-white font-bold"
              : "text-primary"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
