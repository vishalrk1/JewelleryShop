import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ICategory } from "@/lib/types";

interface CategoryCardsProps {
  categories: ICategory[];
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  return (
    <>
      {categories?.map((category, index) => {
        return (
          <div
            key={index}
            className="bg-gray-50 rounded-xl overflow-hidden p-3 aspect-w-1 aspect-h-1"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <Image
                alt="Earrings"
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-none"
                height={400}
                src={category.image}
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="font-semibold text-xl text-gray-900">
                  {category.title}
                </h3>
                <p className="mt-1 mr-2 text-sm text-gray-500">
                  {category.description}
                </p>
              </div>
              <Link href={`product/${category._id}`}>
                <Button variant="default" size="sm">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CategoryCards;
