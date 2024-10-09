import { Feedback } from "@/lib/types";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import axios from "axios";
import { create } from "zustand";

interface FeedbackState {
  feedbacks: Feedback[];
  fetching: boolean;
  error: string | null;
  getFeedbacks: () => Promise<void>;
  addFeedback: (message: string, token: string) => Promise<boolean>;
}

const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedbacks: [],
  fetching: false,
  error: null,
  getFeedbacks: async () => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback`,
        {
          params: {
            isFeatured: true,
          },
        }
      );
      set({
        feedbacks: res.data.data,
        fetching: false,
        error: null,
      });
      showSucessToast("Feedbacks fetched successfully");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
      showErrorToast(errorMessage);
    }
  },
  addFeedback: async (message: string, token: string) => {
    set({ fetching: true, error: null });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ feedbacks: res.data.data, fetching: false, error: null });
      showSucessToast("Feedback added successfully");
      return true;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data?.message
        : "An unknown error occurred";
      set({ error: errorMessage, fetching: false });
      showErrorToast(errorMessage);
      return false;
    }
  },
}));

export default useFeedbackStore;
