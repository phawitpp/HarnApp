import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./globals.css";

const inter = Mitr({
  subsets: ["latin", "latin-ext", "thai", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Han App",
  description: "by phawitpp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
