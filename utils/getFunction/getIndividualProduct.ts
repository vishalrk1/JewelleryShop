// import { IProduct } from "@/lib/types";
// import axios from "axios";

// // function to get categories
// export async function getFeaturedProducts(
//   productId: string
// ): Promise<IProduct> {
//   try {
//     const res = await axios.get<{ message: string; data: IProduct }>(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}`
//     );

//     if (res.status === 200) {
//       return res.data.data;
//     } else {
//       throw new Error(res.data.message);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.message);
//     }
//     throw new Error("An unknown error occurred");
//   }
// }
