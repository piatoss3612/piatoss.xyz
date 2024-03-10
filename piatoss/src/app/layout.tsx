import { ChakraProvider } from "@/providers/ChakraProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "piatoss on the block",
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
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
