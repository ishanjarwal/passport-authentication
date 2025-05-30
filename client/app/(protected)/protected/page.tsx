import ProtectedRoute from "@/components/protected/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="bg-background-muted shadow-xl rounded-2xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          🔒 Protected Page
        </h1>
        <p className="text-foreground-muted text-lg">
          You are successfully authenticated. Welcome!
        </p>
      </div>
    </div>
  );
};

export default page;
