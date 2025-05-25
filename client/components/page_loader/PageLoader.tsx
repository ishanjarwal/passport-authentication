import { Loader2 } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-background flex items-center justify-center">
      <Loader2 size={24} className="text-primary animate-spin" />
    </div>
  );
};

export default PageLoader;
