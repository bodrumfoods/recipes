import Link from "next/link";

export default function SectionHeader({
  title,
  href,
  linkLabel = "View more",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      {href ? (
        <Link
          href={href}
          className="group flex items-center gap-1.5 font-display text-2xl font-bold text-brand-ink"
        >
          {title}
          <span className="transition-transform group-hover:translate-x-1">›</span>
        </Link>
      ) : (
        <h2 className="font-display text-2xl font-bold text-brand-ink">{title}</h2>
      )}
      {href && (
        <Link
          href={href}
          className="whitespace-nowrap text-sm font-semibold text-brand-ink/60 hover:text-brand-red"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
