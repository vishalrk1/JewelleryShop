"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
// import { ModeToggle } from "./Theme/toggle-theme";
import NavLinks from "./navLinks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import prismadb from "@/lib/prismadb";
import AuthButtons from "./navbar/authButtons";
import Link from "next/link";
import { getCategories } from "@/redux/store/categories/action";
import { MobileSidebar } from "./mobileSidebar";
import Image from "next/image";

import logo from "@/public/assets/LogoBlack.png";

const Navbar = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const dispatch = useDispatch<any>();
  const { categories, fetching } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, [categories]);

  useEffect(() => {
    const newRoutes = [] as any[];
    categories?.forEach((category) => {
      newRoutes.push({
        href: `/product/${category.cat_id}/${category.id}`,
        label: category.cat_title,
      });
    });
    setRoutes(newRoutes);
  }, [categories]);

  console.log(routes);

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
              className="object-cover"
              width={32}
              height={32}
            />
          </div>
        </Link>
        <NavLinks routes={routes} className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <ModeToggle /> */}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
