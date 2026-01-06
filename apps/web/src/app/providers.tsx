"use client";

import { Toaster } from "@/components/shadcn-ui/toaster";
import { TooltipProvider } from "@/components/shadcn-ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/hooks/useAuth";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Providers;

