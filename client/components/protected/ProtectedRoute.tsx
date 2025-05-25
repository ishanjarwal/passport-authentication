"use client";

import { selectAuthState } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import PageLoader from "../page_loader/PageLoader";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { is_auth, initialized } = useSelector(selectAuthState);
  const router = useRouter();
  useEffect(() => {
    if (!is_auth && initialized) {
      router.push("/account/login");
    }
  }, [is_auth, initialized]);

  if (!initialized || !is_auth) return <PageLoader />;

  return <>{children}</>;
};

export default ProtectedRoute;
