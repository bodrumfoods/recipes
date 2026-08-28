import Link from "next/link";

export default function CareersFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-ink">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/careers/bodrum-logo.svg" alt="Bodrum Foods" className="h-8 w-auto" />
              <span className="text-sm font-medium text-white/60">Careers</span>
            </div>
            <p className="mt-3 text-sm text-white/60">
              We bring Mediterranean flavours to tables across the UK — from our distribution
              centre and delivery fleet to our Head Office and stores. Join the team.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm sm:items-end">
            <Link href="/careers" className="text-white/70 hover:text-white">
              Search open roles
            </Link>
            <Link href="/privacy-policy" className="text-white/70 hover:text-white">
              Privacy Policy
            </Link>
            <a
              href="https://bodrumfoods.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white"
            >
              Visit bodrumfoods.co.uk ↗
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Bodrum Foods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
