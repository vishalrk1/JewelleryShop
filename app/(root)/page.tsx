"use client";
import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, ListFilter, PlusCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-6">
      <Button
        onClick={() => {
          console.log("Pressed");
        }}
      >
        Press me
      </Button>
    </main>
  );
}
