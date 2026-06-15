import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HostelHubProvider } from "@/context/HostelHubContext";
import DashboardLayout from "@/components/DashboardLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HostelHub - AI Gate Monitoring & Student Portal",
  description: "Next-gen AI face recognition portal and warden control panel for smart campuses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HostelHubProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </HostelHubProvider>
      </body>
    </html>
  );
}
