"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { cookies } from "next/headers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  CombinedUserData,
  CompleteStatsData,
  ordersData,
  productsData,
  UserCnt,
  userData,
} from "./Data";
import PieChartWithPaddingAngle from "./Charts/ProductsPieChart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useAuthStore from "@/hooks/useAuthStore";
import UsersBarPlot from "./Charts/UsersBarPlot";
import OrderCountBarPlot from "./Charts/OrderCountBarPlot";
import RevenueBarPlot from "./Charts/RevenueBarPlot";

interface AdminDashboardProps {
  params: { userId: string };
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ params }) => {
  const userId = params?.userId;
  const { token } = useAuthStore();
  const [mergedData, setMergedData] = useState<CombinedUserData[]>([]);
  const [statsData, setStateData] = useState<CompleteStatsData | null>(null);
  const [radioValue, setRadioValue] = useState<
    "productStock" | "totalProducts"
  >("productStock");

  const ProductCategoryData: {
    title: string;
    description: string;
    value: "productStock" | "totalProducts";
  }[] = [
    {
      title: "Category wise stock availability",
      description:
        "This will display a pie chart, showing the stock availability of each product category. This can be used to analyze the availability of products in different categories.",
      value: "productStock",
    },
    {
      title: "Category wise total available products",
      description:
        "This will display a pie chart, showing the total number of products in each category. This can be used to analyze the total number of products in each category.",
      value: "totalProducts",
    },
  ];

  const handleRadioChange = (value: "productStock" | "totalProducts") => {
    setRadioValue(value);
    console.log("Selected value:", value);
  };

  const mergeUserData = (
    newUsers: UserCnt[],
    activeUsers: UserCnt[]
  ): CombinedUserData[] => {
    return newUsers.map((newUser) => {
      const activeUser = activeUsers.find((au) => au._id === newUser._id);
      return {
        _id: newUser._id,
        newUsersCount: newUser.count,
        activeUsersCount: activeUser ? activeUser.count : 0, // If no active user entry, set to 0
      };
    });
  };

  useEffect(() => {
    setMergedData(mergeUserData(userData.newUsers, userData.activeUsers));
    const getStatsData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/statistics/user`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Data:", data);
          setStateData(data as CompleteStatsData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getStatsData();
  }, [userData.activeUsers, userData.newUsers]);

  useEffect(() => {
    if (statsData) {
      const data = mergeUserData(
        statsData?.userData[0]?.newUsers,
        statsData?.userData[0]?.activeUsers
      );
      setMergedData(data);
    }
  }, [statsData]);

  console.log(statsData);

  return (
    <main className="min-h-screen h-full flex flex-col p-10">
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
      <section className="mt-4 px-12 md:px-24">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-primary">
            Product Statistics
          </h1>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="w-full h-full flex flex-col items-start justify-start my-12 px-4">
              <RadioGroup defaultValue={radioValue} className="w-full">
                {ProductCategoryData?.map((data) => {
                  return (
                    <div
                      key={data.value}
                      onClick={() => handleRadioChange(data.value)}
                      className="cursor-pointer w-full flex gap-1 flex-col bg-slate-100/30 rounded-lg p-4"
                    >
                      <div className="w-full flex items-center justify-start gap-2">
                        <RadioGroupItem
                          value={data?.value}
                          checked={radioValue === data?.value}
                        />
                        <h1 className="text-lg font-semibold text-gray-600">
                          {data?.title}
                        </h1>
                      </div>
                      <p className="text-xs text-gray-500">
                        {data?.description}
                      </p>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            <div className="w-full flex flex-col items-start justify-center">
              <PieChartWithPaddingAngle
                data={productsData}
                dataType={radioValue}
              />
            </div>
          </div>
        </div>
        <UsersBarPlot data={mergedData} />
        {statsData?.ordersData && (
          <OrderCountBarPlot data={statsData?.ordersData} />
        )}
        {statsData?.ordersData && (
          <RevenueBarPlot data={statsData?.ordersData} />
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;
