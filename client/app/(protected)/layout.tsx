import ProtectedRoute from "@/components/protected/ProtectedRoute";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default layout;
