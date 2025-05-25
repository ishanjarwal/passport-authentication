import { selectAuthState, userProfile } from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { is_auth, loading, initialized, user } = useSelector(selectAuthState);

  useEffect(() => {
    if (!initialized) {
      dispatch(userProfile());
    }
  }, [dispatch, initialized]);

  return {
    is_auth,
    loading,
    initialized,
    user,
  };
};
