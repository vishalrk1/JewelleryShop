// "use server";
// import prismadb from "@/lib/prismadb";
// import React from "react";
// import ProductsColumnsClient from "./components/client";
// import { ProductsColumn } from "./components/columns";

// const InventoryPage = async () => {
//   const products = await prismadb.products_product.findMany({
//     include: {
//       categories_category: true,
//     },
//   });
//   const formattedProducts = products.map((product: any) => ({
//     id: Number(product.id).toString(),
//     label: product.prod_title,
//     price: Number(product.prod_price),
//     inStock: product.prod_instock,
//     category: product.categories_category?.cat_title,
//   })) as ProductsColumn[];

//   return (
//     <main className="min-h-screen flex flex-col p-10">
//       <ProductsColumnsClient data={formattedProducts} />
//     </main>
//   );
// };

// export default InventoryPage;

import React from 'react'

const InventoryPage = () => {
  return (
    <div>InventoryPage</div>
  )
}

export default InventoryPage