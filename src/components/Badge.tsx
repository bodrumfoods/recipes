const styles: Record<string, string> = {
  vegan: "bg-brand-olive/15 text-brand-olive",
  vegetarian: "bg-brand-olive/15 text-brand-olive",
  meat: "bg-brand-terracotta/15 text-brand-terracotta",
  seafood: "bg-brand-sea/15 text-brand-sea",
};

export default function Badge({ label }: { label: string }) {
  const className = styles[label] ?? "bg-brand-sea/10 text-brand-sea-dark";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${className}`}>
      {label}
    </span>
  );
}
