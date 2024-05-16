"use client";
import React from "react";
import { columns, ProductsColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/dataTable";

interface ProductsColumnsClientProps {
  data: ProductsColumn[];
}

const ProductsColumnsClient: React.FC<ProductsColumnsClientProps> = ({
  data,
}) => {
  const params = useParams();
  const router = useRouter();
  console.log(params?.userId);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products  (${data.length})`}
          description="All Products available on main store"
        />
        <Button
          onClick={() =>
            router.push(`/${params.userId}/dashboard/inventory/new`)
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};

export default ProductsColumnsClient;
