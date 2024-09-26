import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const OrdersContainerSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-max border-2 border-solid border-gray-300 rounded-lg mt-4">
      <div className="flex flex-col md:flex-row flex-1 bg-gray-100 h-10 rounded-lg rounded-b-none p-4 divide-y-2 divide-gray-300 md:divide-y-0">
        <div className="flex flex-2 gap-8">
          <div className="flex flex-col items-center justify-center gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="hidden lg:flex flex-col items-start justify-start gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center mt-3 md:mt-0">
          <div className="flex-col gap-1">
            <Skeleton className="h-4 w-32 mt-3 md:mt-0" />
            <Skeleton className="h-4 w-40 mt-1" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-50 rounded-lg p-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="flex flex-wrap items-start md:flex-row md:flex-wrap md:items-center justify-start gap-4 w-full">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 w-full md:w-auto"
            >
              <Skeleton className="h-16 w-16 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersContainerSkeleton;
