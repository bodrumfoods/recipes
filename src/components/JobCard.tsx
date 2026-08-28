import Link from "next/link";
import type { JobPosting } from "@/lib/types";
import Badge from "@/components/Badge";
import { daysAgo, isClosingSoon } from "@/lib/jobs";

export default function JobCard({ job }: { job: JobPosting }) {
  return (
    <Link
      href={`/careers/${job.id}`}
      className="group flex flex-col gap-3 border border-brand-border bg-brand-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-ink/30 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge label={job.category} />
          {isClosingSoon(job.closingDate) && (
            <span className="rounded-full bg-brand-red/10 px-2.5 py-1 text-xs font-semibold text-brand-red-dark">
              Closing soon
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg font-bold text-brand-ink underline-offset-4 group-hover:underline">
          {job.title}
        </h3>
        {job.localTitle && (
          <p className="text-sm text-brand-ink/50">{job.localTitle}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-ink/70">
          <span>{job.location}</span>
          <span aria-hidden>•</span>
          <span>
            {job.employmentType} · {job.contractType}
          </span>
          <span aria-hidden>•</span>
          <span className="font-medium text-brand-ink">{job.salary}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
        <span className="text-xs text-brand-ink/50">{daysAgo(job.postedDate)}</span>
        <span className="rounded-full bg-brand-ink px-4 py-2 text-xs font-semibold text-white transition group-hover:bg-brand-red">
          View &amp; Apply
        </span>
      </div>
    </Link>
  );
}
