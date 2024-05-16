"use client";
import React from "react";
import * as z from "zod";

import { categories_category, products_product } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProductFormProps {
  initialData: products_product | null;
  categories: categories_category[];
}

const formSchema = z.object({
  prod_title: z.string().min(1, "Name is required"),
  prod_image_url: z.string().min(1, "Image is required"),
  prod_desc: z.string().min(1, "Description is required"),
  prod_price: z.number().min(1, "Price is required"),
  prod_instock: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  category_id: z.string().min(1, "Category is required"),
});

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData
    ? "Edit a product details"
    : "Create a New Product";
  const toastMessage = !initialData ? "Product Created" : "Product Updated";
  const action = initialData ? "Save Changes" : "Create";
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            // disabled={loading}
            variant="destructive"
            size="icon"
            // onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default ProductForm;
