import { toast } from "react-toastify";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorToastMessage = () => {};

export const notify = (message?: string) => {
  toast.error(message ? message : "오류가 발생했습니다.다시 시도해주세요.", {
    position: "bottom-right",
    className: "foo-bar",
    autoClose: 3000,
    theme: "light",
    pauseOnFocusLoss: false,
    toastId: "error",
    transition: Slide,
  });
};
