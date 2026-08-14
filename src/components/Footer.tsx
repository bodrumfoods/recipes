export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-sand">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-brand-sea-dark/70 sm:px-6">
        <p>
          Mediterranean Table — build your weekly meal plan and order your ingredient list from{" "}
          <a
            href="https://bodrumfoods.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-sea-dark hover:text-brand-sea hover:underline"
          >
            bodrumfoods.co.uk
          </a>
          .
        </p>
        <p className="text-xs text-brand-sea-dark/50">Powered by Bodrum Foods</p>
      </div>
    </footer>
  );
}
