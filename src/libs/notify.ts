import { toast } from "react-toastify";

export const notify = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error" | "info";
}) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
