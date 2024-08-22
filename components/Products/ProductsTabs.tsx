import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import ProductList from "./ProductList";
import { IProduct } from "@/lib/types";

interface Props {
  productsData: IProduct[];
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
    <Tabs defaultValue={currentTab} className="w-full">
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
      </div>

      <ProductList
        productsData={productsData}
        currentTab={currentTab}
        isLoadings={isLoading}
      />
    </Tabs>
  );
};

export default ProductsTabs;
