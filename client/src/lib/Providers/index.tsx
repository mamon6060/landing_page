"use client";

import { store } from "@/src/redux/app/store";
import * as React from "react";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
}
