"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductsColumn = {
  id: string;
  label: string;
  category: string;
  inStock: boolean;
  price: number;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "label",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "inStock",
    header: "Stock Available",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
