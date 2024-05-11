import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden p-3">
      <div className="w-full overflow-hidden rounded-lg bg-gray-200">
        <Skeleton
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
          style={{
            aspectRatio: "400/400",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
