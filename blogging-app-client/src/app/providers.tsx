"use client";
import { Provider } from "react-redux";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
