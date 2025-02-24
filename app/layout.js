import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Custom Font
const outfitFont = Outfit({
  display: "swap",
  subsets: ["latin"],
  weights: ["400", "700"],
});

export const metadata = {
  title: "MiniURL - URL Shortener",
  description: "A modern URL shortner application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-green-50 ${geistSans.variable} ${geistMono.variable} ${outfitFont.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
