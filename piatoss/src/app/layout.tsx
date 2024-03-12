import { ChakraProvider } from "@/providers/ChakraProvider";
import { Center, Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { WalletProvider } from "@/providers/WalletProvider";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "piatoss",
  description: "personal website of piatoss",
  applicationName: "piatoss",
  authors: [
    {
      url: "https://github.com/piatoss3612",
      name: "piatoss",
    },
  ],
  keywords: ["piatoss", "portfolio", "personal", "website"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ChakraProvider>
          <WalletProvider>
            <Box
              className={roboto.className}
              minH="100vh"
              bgGradient="linear(to-br, blue.800, teal.600)"
            >
              <Center w="100%" h="100vh">
                {children}
              </Center>
            </Box>
          </WalletProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
