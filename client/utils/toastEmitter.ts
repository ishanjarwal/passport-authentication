import { resetInfo } from "@/features/auth/authSlice";
import { InfoTypeValues } from "@/features/auth/types";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export default function toastEmitter(
  type: InfoTypeValues,
  message: string,
  dispatch?: Dispatch
) {
  let options = {};
  if (dispatch) {
    options = {
      onOpen: () => {
        dispatch(resetInfo({}));
      },
    };
  }
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
    case "warning":
      toast.warning(message, options);
      break;
    default:
      break;
  }
}
