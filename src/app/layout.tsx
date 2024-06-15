import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import ReactQueryProvider from "@/react-query/provider";
import AuthWrapper from "@/middlewares/authWrapper";
import Head from "next/head";

const merri = Merriweather({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Podcast Today",
  description: "Podcast Today",
  viewport: 'width=device-width, initial-scale=1.0"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={merri.className}>
        <ReactQueryProvider>
          <ReduxProvider>
            <AuthWrapper>{children}</AuthWrapper>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
