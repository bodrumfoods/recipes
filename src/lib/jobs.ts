import jobsData from "@/data/jobs.json";
import type { JobCategory, JobPosting } from "@/lib/types";

export const jobs = jobsData as JobPosting[];

export const openJobs = jobs.filter((job) => job.status === "open");

export function getJobById(id: string): JobPosting | undefined {
  return jobs.find((job) => job.id === id);
}

export const jobCategories: JobCategory[] = [
  "Warehouse & Logistics",
  "Driving",
  "Office & Support",
  "Retail",
];

export const jobLocations = Array.from(new Set(openJobs.map((job) => job.location))).sort();

export function daysAgo(dateStr: string): string {
  const posted = new Date(dateStr);
  const diffMs = Date.now() - posted.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  if (diffDays === 0) return "Posted today";
  if (diffDays === 1) return "Posted 1 day ago";
  return `Posted ${diffDays} days ago`;
}

export function isClosingSoon(closingDate?: string): boolean {
  if (!closingDate) return false;
  const diffMs = new Date(closingDate).getTime() - Date.now();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}
