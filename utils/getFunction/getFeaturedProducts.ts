import { IProduct } from "@/lib/types";
import axios from "axios";

// function to get categories
export async function getFeaturedProducts(): Promise<IProduct[]> {
  try {
    const res = await axios.get<{ message: string; data: IProduct[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/featured`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          isFeatured: true,
        },
      }
    );

    if (res.status === 200) {
      return res.data.data;
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    return [];
  }
}
