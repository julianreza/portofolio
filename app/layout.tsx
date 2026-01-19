import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reza Julian | Full Stack Engineer & Tech Lead",
  description: "7+ years of experience in IT as a Full Stack Engineer and 4+ years as a Tech Lead. Passionate about building scalable applications with modern technologies like React, Next.js, Golang, and more.",
  keywords: ["Full Stack Engineer", "Tech Lead", "React", "Next.js", "Golang", "Node.js", "Software Developer", "Indonesia"],
  authors: [{ name: "Reza Julian" }],
  creator: "Reza Julian",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rezajulian.com",
    title: "Reza Julian | Full Stack Engineer & Tech Lead",
    description: "7+ years of experience building scalable applications. Passionate about creating elegant solutions with modern technologies.",
    siteName: "Reza Julian Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reza Julian | Full Stack Engineer & Tech Lead",
    description: "7+ years of experience building scalable applications with modern technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
