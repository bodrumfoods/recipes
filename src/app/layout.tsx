import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Playfair_Display, Lato } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mediterranean Table | Weekly Meal Planner",
  description:
    "Discover Mediterranean recipes, build a weekly meal plan, and order your ingredient list from bodrumfoods.co.uk.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${playfairDisplay.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AuthProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
