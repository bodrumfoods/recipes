"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/planner", label: "Weekly Planner" },
  { href: "/favorites", label: "My Favourites" },
  { href: "/shopping-list", label: "Shopping List" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-brand-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-sm font-bold tracking-tight text-white">
              MT
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-brand-ink">
              Mediterranean Table
            </span>
          </Link>
          <Link
            href="/shopping-list"
            className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
          >
            My Cart
          </Link>
        </div>
      </div>

      <nav className="hidden bg-brand-ink sm:block">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 text-sm font-medium sm:px-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 py-3 transition ${
                  active
                    ? "border-brand-red text-white"
                    : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="flex items-center gap-4 overflow-x-auto bg-brand-ink px-4 py-2.5 text-sm font-medium sm:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap border-b-2 pb-0.5 ${
                active ? "border-brand-red text-white" : "border-transparent text-white/70"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
