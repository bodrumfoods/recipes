import Link from "next/link";
import { notFound } from "next/navigation";
import { openJobs, getJobById, daysAgo, isClosingSoon } from "@/lib/jobs";
import Badge from "@/components/Badge";
import JobCard from "@/components/JobCard";

export function generateStaticParams() {
  return openJobs.map((job) => ({ slug: job.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobById(slug);
  if (!job) return { title: "Job not found | Bodrum Foods Careers" };
  return {
    title: `${job.title} | Bodrum Foods Careers`,
    description: job.summary,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobById(slug);
  if (!job || job.status !== "open") notFound();

  const relatedJobs = openJobs
    .filter((j) => j.id !== job.id && j.category === job.category)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="border-b border-brand-border bg-brand-ink">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
          <Link href="/careers" className="text-sm font-medium text-white/70 hover:text-white">
            ‹ Back to all roles
          </Link>
          <div className="animate-fade-in-up mt-4 flex flex-wrap items-center gap-2">
            <Badge label={job.category} />
            {isClosingSoon(job.closingDate) && (
              <span className="rounded-full bg-brand-red px-2.5 py-1 text-xs font-semibold text-white">
                Closing soon
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {job.title}
          </h1>
          {job.localTitle && <p className="mt-1 text-white/60">{job.localTitle}</p>}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span>{job.location}</span>
            <span>
              {job.employmentType} · {job.contractType}
            </span>
            <span className="font-semibold text-white">{job.salary}</span>
            <span>{daysAgo(job.postedDate)}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="animate-fade-in-up space-y-8">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-brand-ink">
                About the role
              </h2>
              <p className="leading-relaxed text-brand-ink/80">{job.summary}</p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-brand-ink">
                What you&apos;ll do
              </h2>
              <ul className="space-y-2 text-brand-ink/80">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-brand-ink">
                What we&apos;re looking for
              </h2>
              <ul className="space-y-2 text-brand-ink/80">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-brand-ink">
                What you&apos;ll get
              </h2>
              <ul className="grid grid-cols-1 gap-2 text-brand-ink/80 sm:grid-cols-2">
                {job.benefits.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 border border-brand-border bg-brand-muted px-3 py-2 text-sm"
                  >
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit space-y-4 border border-brand-border bg-brand-card p-6 lg:sticky lg:top-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                Salary
              </p>
              <p className="font-semibold text-brand-ink">{job.salary}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                Location
              </p>
              <p className="text-brand-ink/80">{job.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                Contract
              </p>
              <p className="text-brand-ink/80">
                {job.employmentType} · {job.contractType}
              </p>
            </div>
            {job.closingDate && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                  Applications close
                </p>
                <p className="text-brand-ink/80">
                  {new Date(job.closingDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
            <Link
              href={`/careers/${job.id}/apply`}
              className="block w-full rounded-full bg-brand-red px-4 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-red-dark"
            >
              Apply Now
            </Link>
          </aside>
        </div>
      </section>

      {relatedJobs.length > 0 && (
        <section className="border-t border-brand-border bg-brand-muted">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <h2 className="mb-6 text-xl font-bold text-brand-ink">
              Other {job.category} roles
            </h2>
            <div className="flex flex-col gap-4">
              {relatedJobs.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
