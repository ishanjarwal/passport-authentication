"use client";

import { logoutUser, selectAuthState } from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const LogoutButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(selectAuthState);
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/account/login");
  };

  return (
    <button disabled={loading} className={className} onClick={handleLogout}>
      {!loading ? "Logout" : <Loader2 className="animate-spin" />}
    </button>
  );
};

export default LogoutButton;
