import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import ProductList from "./ProductList";
import { products_product } from "@prisma/client";
import Loader from "../Loader";

interface Props {
  productsData: products_product[];
  isLoading: boolean;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const ProductsTabs: React.FC<Props> = ({
  productsData,
  isLoading,
  currentTab,
  setCurrentTab,
}) => {
  return (
    <Tabs defaultValue={currentTab}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setCurrentTab("all")}>
            All
          </TabsTrigger>
          <TabsTrigger
            value="trending"
            onClick={() => setCurrentTab("trending")}
          >
            Trending
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-7 gap-1">
            <ShoppingCart className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Cart
            </span>
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <ProductList productsData={productsData} currentTab={currentTab} />
      )}
    </Tabs>
  );
};

export default ProductsTabs;
