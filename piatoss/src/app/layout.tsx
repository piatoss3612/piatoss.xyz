import { ChakraProvider } from "@/providers/ChakraProvider";
import { Center, Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { WalletProvider } from "@/providers/WalletProvider";
import FloatingPiatoss from "@/components/FloatingPiatoss";

const baloo2 = Baloo_2({ weight: "400", subsets: ["latin"] });

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
      <body className={baloo2.className}>
        <ChakraProvider>
          <WalletProvider>
            <Box
              position="relative"
              minH="100vh"
              overflow="hidden"
              bg="linear-gradient(to bottom, #000000, #131313)"
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={1}
              >
                <FloatingPiatoss />
              </Box>
              <Center position="relative" w="100%" h="100vh" zIndex={2}>
                {children}
              </Center>
            </Box>
          </WalletProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
