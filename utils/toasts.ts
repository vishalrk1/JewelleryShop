import toast from "react-hot-toast";

export const showErrorToast = (message: string) => {
  return toast.error(message, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
