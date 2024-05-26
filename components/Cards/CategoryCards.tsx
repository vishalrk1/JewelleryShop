import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { categories_category } from "@/prisma/generated/client";

interface CategoryCardsProps {
  categories: categories_category[];
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ categories }) => {
  return (
    <>
      {categories?.map((category, index) => {
        return (
          <div key={index} className="bg-gray-50 rounded-xl overflow-hidden p-3 aspect-w-1 aspect-h-1">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <Image
                alt="Earrings"
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-none"
                height={400}
                src={category.cat_image_url}
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
                  {category.cat_title}
                </h3>
                <p className="mt-1 mr-2 text-sm text-gray-500">
                  {`Elevate your look with our stunning ${category.cat_title} collection.`}
                </p>
              </div>
              <Link href={`product/${category.cat_id}/${category.id}`}>
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
