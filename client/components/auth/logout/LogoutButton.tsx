"use client";

import { logoutUser, selectAuthState } from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import toastEmitter from "@/utils/toastEmitter";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LogoutButton = ({ className }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { info } = useSelector(selectAuthState);
  const { loading } = useSelector(selectAuthState);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (info) {
      toastEmitter(info.type, info.message, dispatch);
    }
  }, [info]);

  return (
    <button disabled={loading} className={className} onClick={handleLogout}>
      {!loading ? "Logout" : <Loader2 className="animate-spin" />}
    </button>
  );
};

export default LogoutButton;
