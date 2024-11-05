import toast from "react-hot-toast";

export const showErrorToast = (message: string, isCenter: boolean = false) => {
  return toast.error(message, {
    position: isCenter ? "top-center" : "bottom-left",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const showSucessToast = (message: string) => {
  return toast.success(message, {
    position: "top-center",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
