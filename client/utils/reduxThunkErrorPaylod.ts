import { ErrorPayload } from "@/features/auth/types";
import axios from "axios";

const reduxThunkErrorPaylod = (error: any): ErrorPayload => {
  let paylod: ErrorPayload;
  if (axios.isAxiosError(error)) {
    paylod = {
      status: error.response?.data.status || "error",
      message: error.response?.data.message || "Something went wrong",
    };
  } else {
    paylod = {
      status: "error",
      message: "Something went wrong",
    };
  }
  return paylod;
};

export default reduxThunkErrorPaylod;
