import { toast } from "react-toastify";

export default class Toastify {
  errorToast = (err: string) =>
    toast(`Something went wrong! ${err}`, {
      position: "top-right",
      autoClose: 2000,
      type: "error",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  infoToast = (message: string) =>
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      type: "info",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  successToast = (message: string) =>
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      type: "success",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
}
