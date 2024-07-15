import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import ReactQueryProvider from "@/react-query/provider";
import AuthWrapper from "@/middlewares/authWrapper";

const merri = Noto_Serif({
  subsets: ["vietnamese", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
