export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-brand-ink/70 sm:px-6">
        <p>
          Mediterranean Table — build your weekly meal plan and order your ingredient list from{" "}
          <a
            href="https://bodrumfoods.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-ink hover:text-brand-red hover:underline"
          >
            bodrumfoods.co.uk
          </a>
          .
        </p>
        <p className="text-xs text-brand-ink/50">Powered by Bodrum Foods</p>
      </div>
    </footer>
  );
}
