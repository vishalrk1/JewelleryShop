
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface AdminDashboardProps {
  params: { userId: string };
}

const AdminDashboard: React.FC<AdminDashboardProps> = async ({ params }) => {
  const userId = params?.userId;
  const user = await prismadb.auth_user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      main_userprofile: true,
    },
  });
  const products = await prismadb.products_product.findMany({});

  const data = [
    {
      name: "Total Users",
      value: await prismadb.auth_user.count(),
    },
    {
      name: "Products Available",
      value: await prismadb.products_product.count({
        where: {
          prod_instock: true,
        },
      }),
    },
    {
      name: "Orders Placed",
      value: await prismadb.order_order.count(),
    },
    {
      name: "Total Items Sold",
      value: await prismadb.order_orderitem.count(),
    },
  ];

  if (!user) {
    redirect("/login");
  } else if (user && !user?.is_staff) {
    redirect("/");
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data?.map((item, index) => (
            <Card className="" key={index}>
              <CardHeader>
                <CardTitle className="w-full flex justify-between text-xl items-center gap-2 font-medium">
                  {item?.name}
                  <div className="flex justify-end items-end text-4xl font-normal overflow-clip line-clamp-1">
                    {item?.value}
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
