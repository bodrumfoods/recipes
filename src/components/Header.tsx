"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/planner", label: "Weekly Planner" },
  { href: "/favorites", label: "My Favourites" },
  { href: "/shopping-list", label: "Shopping List" },
];

function AccountControl() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return <span className="h-5 w-16 animate-pulse rounded bg-white/10" />;
  }

  if (!session) {
    return (
      <button
        type="button"
        onClick={() => signIn("google")}
        className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white hover:bg-white/10"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="relative isolate">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-white/20 py-1 pl-1 pr-3 text-xs font-semibold text-white transition hover:border-white/50"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt=""
            width={22}
            height={22}
            className="rounded-full"
          />
        ) : (
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-red text-[10px] font-bold">
            {session.user?.name?.[0]?.toUpperCase() ?? "U"}
          </span>
        )}
        {session.user?.name?.split(" ")[0] ?? "Account"}
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-brand-border p-2 text-sm shadow-xl"
            style={{ backgroundColor: "#ffffff" }}
          >
            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-brand-ink hover:bg-brand-muted"
            >
              My Favourites
            </Link>
            <Link
              href="/history"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-brand-ink hover:bg-brand-muted"
            >
              Meal Plan History
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="block w-full rounded-lg px-3 py-2 text-left text-brand-ink hover:bg-brand-muted"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6 text-sm font-medium">
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
          <AccountControl />
        </div>
      </nav>

      <nav className="flex items-center justify-between gap-4 overflow-x-auto bg-brand-ink px-4 py-2.5 text-sm font-medium sm:hidden">
        <div className="flex items-center gap-4">
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
        </div>
        <AccountControl />
      </nav>
    </header>
  );
}
