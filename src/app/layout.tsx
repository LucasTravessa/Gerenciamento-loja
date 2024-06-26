import "./globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  icons: [{ rel: "icon", url: "/linux-icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <TRPCReactProvider headers={headers()}>
          <Toaster position="top-right" />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
