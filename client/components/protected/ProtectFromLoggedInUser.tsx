"use client";

import { selectAuthState } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import PageLoader from "../page_loader/PageLoader";

const ProtectFromLoggedInUser = ({ children }: { children: ReactNode }) => {
  const { is_auth, initialized } = useSelector(selectAuthState);
  const router = useRouter();
  useEffect(() => {
    if (is_auth && initialized) {
      router.push("/account/profile");
    }
  }, [is_auth, initialized]);

  if (is_auth || !initialized) return <PageLoader />;

  return <>{children}</>;
};

export default ProtectFromLoggedInUser;
