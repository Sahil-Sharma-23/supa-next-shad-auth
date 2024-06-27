import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ViewTransitions } from "next-view-transitions";
import ProgressProvider from "@/providers/ProgressProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Template",
  description:
    "NextJS + Supabase + ShadCN-UI Authentication template by Sahil Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProgressProvider>{children}</ProgressProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
