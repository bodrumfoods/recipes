import Link from "next/link";
import { notFound } from "next/navigation";
import { openJobs, getJobById } from "@/lib/jobs";
import ApplicationForm from "@/components/ApplicationForm";

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
  if (!job) return { title: "Apply | Bodrum Foods Careers" };
  return { title: `Apply — ${job.title} | Bodrum Foods Careers` };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobById(slug);
  if (!job || job.status !== "open") notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/careers/${job.id}`}
        className="text-sm font-medium text-brand-ink/60 hover:text-brand-red"
      >
        ‹ Back to role details
      </Link>

      <div className="mt-4 animate-fade-in-up border-b border-brand-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">
          Application form
        </p>
        <h1 className="mt-1 text-2xl font-bold text-brand-ink sm:text-3xl">
          Apply for {job.title}
        </h1>
        <p className="mt-2 text-sm text-brand-ink/60">
          {job.location} · {job.employmentType} · {job.contractType} · {job.salary}
        </p>
      </div>

      <div className="mt-8 animate-fade-in-up">
        <ApplicationForm job={job} />
      </div>
    </div>
  );
}
