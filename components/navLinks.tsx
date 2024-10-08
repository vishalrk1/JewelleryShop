"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  routes: any[];
}

const NavLinks: React.FC<Props> = ({ className, routes }) => {
  const pathname = usePathname();

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
