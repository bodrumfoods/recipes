export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-sand">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-brand-sea-dark/70 sm:px-6">
        <p>
          Akdeniz Mutfağı — haftalık yemek planlarınızı oluşturun, malzeme listenizi{" "}
          <a
            href="https://bodrumfoods.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-terracotta hover:underline"
          >
            bodrumfoods.co.uk
          </a>{" "}
          üzerinden sipariş edin.
        </p>
      </div>
    </footer>
  );
}
