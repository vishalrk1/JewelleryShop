import { products_product } from "@/prisma/generated/client";
import axios from "axios";

export async function getProductData(productId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data as products_product;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}
