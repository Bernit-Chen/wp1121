import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

// import global styles for tailwind to work
import "./globals.css";

// nextjs provides helper functions to load google fonts
// read more about fonts in nextjs here:
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#google-fonts
const noto = Noto_Sans({
  subsets: ["latin-ext"],
  // We can specify the font weights with numbers or names
  // 400 corresponds to "regular" and 700 corresponds to "bold".
  // This setting specifies that we only want to load the regular and bold weights
  // so we don't load the whole font family.
  weight: ["400", "700"],
  // we can reference the font in our css using the name we provided here
  variable: "--noto-sans",
});

// nextjs provides a way to set metadata for the page
// the exported metadata object is used by nextjs to set the page metadata
// read more about metadata helpers in nextjs here:
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Join Me",
  description: "Generated by create next app",
  icons: "/yellow.ico",
};

// The root layout is the outermost component that wraps all pages
// this prevents us from having to repeat the same layout code in every page
// it also prevents us from loading redundant javascript in every page
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* this applies the font to the whole page */}
      <body className={noto.className}>
        <div className="mx-auto flex max-w-6xl">
          <Header />
          <main className="flex min-h-screen w-full">
            <Separator orientation="vertical" />
            {children}
            <Separator orientation="vertical" />
          </main>
        </div>
      </body>
    </html>
  );
}
