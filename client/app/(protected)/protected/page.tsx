import ProtectedRoute from "@/components/protected/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[calc(100vh-120px)]">
      This is protected route, can't be accessed by normal users
    </div>
  );
};

export default page;
