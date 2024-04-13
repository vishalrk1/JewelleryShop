import ProductList from "@/components/Products/ProductList";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prismadb from "@/lib/prismadb";
import { File, ListFilter, PlusCircle, ShoppingCart } from "lucide-react";
import React from "react";

interface Props {
  params: { catId: string[] };
}

const ProductsPage: React.FC<Props> = async ({ params }) => {
  const categoryId = parseInt(params.catId[1], 10);
  const productsData = await prismadb.products_product.findMany({
    where: {
      category_id: categoryId,
    },
    include: {
      categories_category: true,
    },
  });

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-6">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
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
        <ProductList productsData={productsData} />
      </Tabs>
    </main>
  );
};

export default ProductsPage;
