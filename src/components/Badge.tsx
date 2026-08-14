const styles: Record<string, string> = {
  vegan: "bg-brand-olive/15 text-brand-olive",
  vejetaryen: "bg-brand-olive/15 text-brand-olive",
  et: "bg-brand-terracotta/15 text-brand-terracotta",
  "deniz-ürünü": "bg-brand-sea/15 text-brand-sea",
};

export default function Badge({ label }: { label: string }) {
  const className = styles[label] ?? "bg-brand-sea/10 text-brand-sea-dark";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>{label}</span>
  );
}
