import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/planner", label: "Weekly Planner" },
  { href: "/shopping-list", label: "Shopping List" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-sm font-bold tracking-tight text-white">
            MT
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-brand-ink">
            Mediterranean Table
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-ink sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-red">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/shopping-list"
          className="rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green-dark"
        >
          My Cart
        </Link>
      </div>
      <nav className="flex items-center gap-4 overflow-x-auto border-t border-brand-border px-4 py-2 text-sm font-medium text-brand-ink sm:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-brand-red">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
