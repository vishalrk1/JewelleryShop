"use server";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface AdminDashboardProps {
  params: { userId: string };
}

const AdminDashboard: React.FC<AdminDashboardProps> = async ({ params }) => {
  const userId = params?.userId;
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");

  console.log(token);

  return (
    <main className="h-screen flex flex-col p-10">
      <section>
        <h1 className="text-2xl font-bold mb-2 text-primary">
          Admin Dashboard
        </h1>
        <div className="flex flex-row gap-4">
          <Link href={`/${userId}/dashboard/inventory/`} className="w-1/2">
            <Button variant="outline" size="sm" className="w-full">
              Visit Inventory
            </Button>
          </Link>
        </div>
      </section>
      <Separator className="my-4" />
      <section className="my-8">
        <h1 className="text-2xl font-bold mb-2 text-primary">
          Store Statistics
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
      </section>
    </main>
  );
};

export default AdminDashboard;
