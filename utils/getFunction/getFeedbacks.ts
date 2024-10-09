import { Feedback, IProduct } from "@/lib/types";
import axios from "axios";

// function to get categories
export async function getFeaturedFeedbacks(): Promise<Feedback[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback`,
      {
        params: {
          isFeatured: true,
        },
      }
    );
    return res.data.data as Feedback[];
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error?.response?.data?.message
      : "An unknown error occurred";
    return [];
  }
}
