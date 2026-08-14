const styles: Record<string, string> = {
  vegan: "bg-brand-olive/25 text-brand-sea-dark",
  vegetarian: "bg-brand-olive/25 text-brand-sea-dark",
  meat: "bg-brand-peach text-brand-sea-dark",
  seafood: "bg-brand-terracotta text-brand-sea-dark",
};

export default function Badge({ label }: { label: string }) {
  const className = styles[label] ?? "bg-brand-border text-brand-sea-dark";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${className}`}>
      {label}
    </span>
  );
}
