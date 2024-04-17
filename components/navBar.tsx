import React from "react";
import { redirect } from "next/navigation";
// import { ModeToggle } from "./Theme/toggle-theme";
import NavLinks from "./navLinks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import prismadb from "@/lib/prismadb";
import AuthButtons from "./navbar/authButtons";
import Link from "next/link";

const Navbar = async () => {
  const routes = [] as any[];
  const categories = await prismadb.categories_category
    .findMany()
    .then((categories) => {
      categories?.forEach((category) => {
        routes.push({
          href: `/product/${category.cat_id}/${category.id}`,
          label: category.cat_title,
        });
      });
    });
  // const { user } = useSelector((state: RootState) => state.auth);
  // console.log("user", user);

  return (
    <nav className="border-b bg-background dark:bg-secondary">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <h1 className="space-x-2 text-xl font-bold">Illusion</h1>
        </Link>
        <div>
          <NavLinks routes={routes} className="mx-6" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {/* <ModeToggle /> */}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
