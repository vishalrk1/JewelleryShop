import { products_product } from "@/prisma/generated/client";
import axios from "axios";

export async function getProductData(productId: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${productId}`
    );
    return response?.data as products_product;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}
