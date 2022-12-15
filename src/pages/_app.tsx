import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";
import { NftsProvider } from "~/context/NftsContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NftsProvider>
        <Toaster />
        <Component {...pageProps} />
      </NftsProvider>
    </ChakraProvider>
  );
}
