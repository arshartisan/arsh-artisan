import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { SmoothScroll } from "@/components/smooth-scroll";
import { content } from "@/lib/content";
import "./globals.css";

const geist = GeistSans;

export const metadata: Metadata = {
  title: content.site.title,
  description: content.site.description,
};

export const viewport: Viewport = {
  themeColor: "#161616",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
