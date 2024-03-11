"use client";

import { ChakraProvider as Chakra, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        height: "100%",
        margin: 0,
        padding: 0,
      },
    },
  },
});

export const ChakraProvider = ({ children }: { children: React.ReactNode }) => {
  return <Chakra theme={theme}>{children}</Chakra>;
};
