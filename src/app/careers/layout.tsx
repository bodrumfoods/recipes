import type { Metadata } from "next";
import CareersHeader from "@/components/CareersHeader";
import CareersFooter from "@/components/CareersFooter";

export const metadata: Metadata = {
  title: {
    template: "%s | Bodrum Foods Careers",
    default: "Bodrum Foods Careers — Search Jobs",
  },
  description:
    "Search and apply for warehouse, driving, office and retail roles at Bodrum Foods.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CareersHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <CareersFooter />
    </>
  );
}
