"use client";

import { store } from ".";
import { Provider } from "react-redux";
import React from "react";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
