import prismadb from "@/lib/prismadb";
import React from "react";

const InventoryPage = async () => {
  const products = await prismadb.products_product.findMany({});
  return (
    <main className="h-screen flex flex-col p-10">
      <section>
        <h1 className="text-2xl font-semibold">Product Inventory</h1>
      </section>
    </main>
  );
};

export default InventoryPage;
