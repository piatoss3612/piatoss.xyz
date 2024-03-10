"use client";

import { ChakraProvider as Chakra } from "@chakra-ui/react";

export const ChakraProvider = ({ children }: { children: React.ReactNode }) => {
  return <Chakra>{children}</Chakra>;
};
