import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ggSans2 } from "@/assets/fonts";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen w-screen max-h-screen max-w-[100vw]">
          <Providers>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
