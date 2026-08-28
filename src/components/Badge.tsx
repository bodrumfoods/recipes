const styles: Record<string, string> = {
  vegan: "bg-brand-green/10 text-brand-green-dark",
  vegetarian: "bg-brand-green/10 text-brand-green-dark",
  meat: "bg-brand-red/10 text-brand-red-dark",
  seafood: "bg-brand-muted text-brand-ink",
  "Warehouse & Logistics": "bg-brand-green/10 text-brand-green-dark",
  Driving: "bg-brand-red/10 text-brand-red-dark",
  "Office & Support": "bg-blue-500/10 text-blue-700",
  Retail: "bg-amber-500/10 text-amber-700",
};

export default function Badge({ label }: { label: string }) {
  const className = styles[label] ?? "bg-brand-muted text-brand-ink";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${className}`}>
      {label}
    </span>
  );
}
