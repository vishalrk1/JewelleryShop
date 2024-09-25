"use server";
import React from "react";
import NavLinks from "./navLinks";
import AuthButtons from "./navbar/authButtons";
import Link from "next/link";
import { MobileSidebar } from "./mobileSidebar";
import Image from "next/image";

import logo from "@/public/assets/LogoBlack.png";
import { ICategory, NavRoute } from "@/lib/types";
import { getCategoriesSvr } from "@/utils/getFunction/getCategories";

const Navbar = async () => {
  let categories: ICategory[] = [];
  let routes = [] as NavRoute[];

  try {
    categories = await getCategoriesSvr();
    categories?.forEach((category) => {
      routes.push({
        href: `/product/${category._id}`,
        label: category.title,
      });
    });
  } catch (error) {
    error = (error as Error).message;
  }

  return (
    <nav className="border-b bg-background dark:bg-secondary">
      <div className="flex h-16 items-center px-8">
        <MobileSidebar routes={routes} />
        <Link href="/">
          <div className="hidden md:flex items-center justify-center aspect-square rounded-xl relative">
            <Image
              src={logo}
              title="illusion"
              alt="illusion-logo"
              className="object-cover pointer-events-none"
              width={32}
              height={32}
            />
          </div>
        </Link>
        <NavLinks routes={routes} categories={categories} className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <ModeToggle /> */}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
