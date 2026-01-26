import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ferrari SF90 Stradale",
  description: "The first Series Production PHEV Spider.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="antialiased font-rajdhani bg-ferrari-black text-white">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
