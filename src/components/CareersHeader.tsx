"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [{ href: "/careers", label: "Job Search" }];

export default function CareersHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/careers" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/careers/bodrum-logo.svg" alt="Bodrum Foods" className="h-9 w-auto" />
          <span className="text-sm font-medium text-brand-ink/50">Careers</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "text-brand-red" : "text-brand-ink/70 hover:text-brand-ink"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://bodrumfoods.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-brand-ink/60 hover:text-brand-red sm:inline"
          >
            bodrumfoods.co.uk ↗
          </a>
          <Link
            href="/careers"
            className="rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
          >
            Search Jobs
          </Link>
        </div>
      </div>
    </header>
  );
}
