import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import Header from "./Header";
import { Toaster } from "~/components/ui/toaster";

import "./globals.css";

const interFont = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "My Notes",
  description: "Welcome to my notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          className={cn(
            "min-h-screen bg-background font-sans antialiased container",
            interFont.variable
          )}
        >
          <Header />
          <main className="mt-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
