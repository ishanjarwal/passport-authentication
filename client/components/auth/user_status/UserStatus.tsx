"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

const UserStatus = ({ children }: { children: ReactNode }) => {
  useAuth();
  return <>{children}</>;
};

export default UserStatus;
