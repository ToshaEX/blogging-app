"use client";
import { Provider } from "react-redux";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider>
          <ChakraProvider
            toastOptions={{ defaultOptions: { position: "top-right" } }}
          >
            {children}
          </ChakraProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}
