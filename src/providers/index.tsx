"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

export const queryClient = new QueryClient();

import type { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <ReactQueryDevtools />
        </ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
