// import { Heading } from "@/components/ui/heading";
// import prismadb from "@/lib/prismadb";
// import React from "react";
// import ProductForm from "./component/productForm";
// // import { categories_category, products_product } from "@prisma/client";

// const ProductPage = async ({
//   params,
// }: {
//   params: {
//     userId: string;
//     productId: string;
//   };
// }) => {
//   const categories = (await prismadb.categories_category.findMany(
//     {}
//   )) as any[];
//   const productData =
//     params.productId === "new"
//       ? null
//       : ((await prismadb.products_product.findUnique({
//           where: {
//             id: parseInt(params?.productId),
//           },
//           include: {
//             categories_category: true,
//           },
//         })) as any);

//   return (
//     <main className="min-h-screen flex flex-col p-10">
//       <ProductForm
//         initialData={productData}
//         categories={categories}
//         cat_id={productData?.categories_category.cat_id}
//         userId={params?.userId}
//       />
//     </main>
//   );
// };

// export default ProductPage;

import React from 'react'

const ProductPage = () => {
  return (
    <div>ProductPage</div>
  )
}

export default ProductPage