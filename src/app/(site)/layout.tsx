import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Mediterranean Table | Weekly Meal Planner",
  description:
    "Discover Mediterranean recipes, build a weekly meal plan, and order your ingredient list from bodrumfoods.co.uk.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
