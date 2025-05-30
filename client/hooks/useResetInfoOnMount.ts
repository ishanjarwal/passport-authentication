import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetInfo } from "@/features/auth/authSlice";

export const useResetInfoOnMount = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetInfo(null));
  }, [dispatch]);
};
