"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import type { JobPosting } from "@/lib/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-brand-border bg-brand-card p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-ink text-sm font-bold text-white">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-semibold text-brand-ink">{title}</h2>
          {description && <p className="mt-1 text-sm text-brand-ink/60">{description}</p>}
        </div>
      </div>
      <div className="space-y-4 pl-11">{children}</div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-ink">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-brand-border bg-white px-3.5 py-2.5 text-sm text-brand-ink outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/15";

export default function ApplicationForm({ job }: { job: JobPosting }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reference, setReference] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showDrivingFields = job.category === "Driving";
  const showWarehouseFields = job.category === "Warehouse & Logistics";

  function validateFile(file: File): string | null {
    if (!ACCEPTED_TYPES.includes(file.type)) return "CV must be a PDF or Word document.";
    if (file.size > MAX_FILE_SIZE) return "CV file must be smaller than 5MB.";
    return null;
  }

  function handleFileChange(file: File | null) {
    if (!file) {
      setFileName("");
      return;
    }
    const error = validateFile(file);
    if (error) {
      setStatus("error");
      setErrorMessage(error);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFileName("");
      return;
    }
    setFileName(file.name);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("jobId", job.id);
    formData.set("jobTitle", job.title);

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setReference(data.reference);
      setStatus("success");
      form.reset();
      setFileName("");
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-brand-green/30 bg-brand-green/5 p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-2xl text-white mx-auto">
          ✓
        </span>
        <h2 className="mt-4 text-xl font-bold text-brand-ink">
          Application submitted
        </h2>
        <p className="mx-auto mt-2 max-w-md text-brand-ink/70">
          Thanks for applying for <strong>{job.title}</strong>. Our recruitment team will review
          your application and get back to you by email. Please keep your reference number for
          any follow-up.
        </p>
        <p className="mt-4 inline-block rounded-full bg-brand-ink px-4 py-2 font-mono text-sm text-white">
          {reference}
        </p>
        <div className="mt-6">
          <Link
            href="/careers"
            className="rounded-full border border-brand-border px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:border-brand-ink"
          >
            View more roles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-sm text-brand-red-dark">
          {errorMessage}
        </div>
      )}

      <FormSection step={1} title="Personal details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First name" htmlFor="firstName" required>
            <input id="firstName" name="firstName" required className={inputClass} />
          </Field>
          <Field label="Last name" htmlFor="lastName" required>
            <input id="lastName" name="lastName" required className={inputClass} />
          </Field>
          <Field label="Email address" htmlFor="email" required>
            <input id="email" name="email" type="email" required className={inputClass} />
          </Field>
          <Field label="Phone number" htmlFor="phone" required>
            <input id="phone" name="phone" type="tel" required className={inputClass} />
          </Field>
          <Field label="Postcode" htmlFor="postcode">
            <input id="postcode" name="postcode" className={inputClass} />
          </Field>
          <Field label="How did you hear about us?" htmlFor="hearAboutUs">
            <select id="hearAboutUs" name="hearAboutUs" className={inputClass} defaultValue="">
              <option value="">Select an option</option>
              <option value="indeed">Indeed / job board</option>
              <option value="social-media">Social media</option>
              <option value="friend-family">Friend or family referral</option>
              <option value="store">In-store / distribution centre notice</option>
              <option value="website">Bodrum Foods website</option>
              <option value="other">Other</option>
            </select>
          </Field>
        </div>
      </FormSection>

      <FormSection
        step={2}
        title="Right to work & availability"
        description="Required for all roles under UK employment law."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Do you have the right to work in the UK?" htmlFor="rightToWork" required>
            <select id="rightToWork" name="rightToWork" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">Yes</option>
              <option value="yes-visa">Yes, with a visa/sponsorship</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field label="Earliest available start date" htmlFor="availableFrom">
            <input id="availableFrom" name="availableFrom" type="date" className={inputClass} />
          </Field>
          <Field label="Current notice period (if employed)" htmlFor="noticePeriod">
            <input
              id="noticePeriod"
              name="noticePeriod"
              placeholder="e.g. 1 week, Immediate"
              className={inputClass}
            />
          </Field>
        </div>

        {showDrivingFields && (
          <div className="grid grid-cols-1 gap-4 border-t border-brand-border pt-4 sm:grid-cols-2">
            <Field label="Driving licence categories held" htmlFor="drivingLicence" required>
              <input
                id="drivingLicence"
                name="drivingLicence"
                required
                placeholder="e.g. C+E, Driver CPC"
                className={inputClass}
              />
            </Field>
            <Field label="Years of relevant driving experience" htmlFor="drivingExperience">
              <input id="drivingExperience" name="drivingExperience" className={inputClass} />
            </Field>
          </div>
        )}

        {showWarehouseFields && (
          <div className="grid grid-cols-1 gap-4 border-t border-brand-border pt-4 sm:grid-cols-2">
            <Field label="Do you hold a valid forklift licence?" htmlFor="forkliftLicence">
              <select id="forkliftLicence" name="forkliftLicence" className={inputClass} defaultValue="">
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="willing">No, but willing to train</option>
              </select>
            </Field>
          </div>
        )}
      </FormSection>

      <FormSection step={3} title="CV & cover letter">
        <Field label="Upload your CV (PDF or Word, max 5MB)" htmlFor="cv" required>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0] ?? null;
              if (file && fileInputRef.current) {
                const dt = new DataTransfer();
                dt.items.add(file);
                fileInputRef.current.files = dt.files;
              }
              handleFileChange(file);
            }}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition ${
              dragActive ? "border-brand-red bg-brand-red/5" : "border-brand-border bg-brand-muted"
            }`}
          >
            <input
              ref={fileInputRef}
              id="cv"
              name="cv"
              type="file"
              required
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
            />
            <p className="text-sm text-brand-ink/70">
              {fileName ? (
                <span className="font-medium text-brand-ink">{fileName}</span>
              ) : (
                <>Drag and drop your CV here, or</>
              )}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full border border-brand-border bg-white px-4 py-2 text-xs font-semibold text-brand-ink transition hover:border-brand-ink"
            >
              {fileName ? "Replace file" : "Browse files"}
            </button>
          </div>
        </Field>
        <Field label="Cover letter (optional)" htmlFor="coverLetter">
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={5}
            placeholder="Tell us a little about why you'd be great for this role."
            className={inputClass}
          />
        </Field>
      </FormSection>

      <FormSection
        step={4}
        title="Equal opportunities monitoring"
        description="Optional. This information is used anonymously for diversity monitoring and does not affect your application."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Gender" htmlFor="eoGender">
            <select id="eoGender" name="eoGender" className={inputClass} defaultValue="">
              <option value="">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="self-describe">Prefer to self-describe</option>
            </select>
          </Field>
          <Field label="Ethnicity" htmlFor="eoEthnicity">
            <select id="eoEthnicity" name="eoEthnicity" className={inputClass} defaultValue="">
              <option value="">Prefer not to say</option>
              <option value="white">White</option>
              <option value="turkish-cypriot">Turkish / Turkish Cypriot</option>
              <option value="asian">Asian or Asian British</option>
              <option value="black">Black, Black British, Caribbean or African</option>
              <option value="mixed">Mixed or multiple ethnic groups</option>
              <option value="other">Other ethnic group</option>
            </select>
          </Field>
          <Field label="Disability" htmlFor="eoDisability">
            <select id="eoDisability" name="eoDisability" className={inputClass} defaultValue="">
              <option value="">Prefer not to say</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </Field>
        </div>
      </FormSection>

      <div className="border border-brand-border bg-brand-muted p-6">
        <label className="flex items-start gap-3 text-sm text-brand-ink/80">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 accent-brand-red"
          />
          <span>
            I confirm the information provided is accurate, and I agree that Bodrum Foods can
            store and use my details to process this application, in line with the{" "}
            <Link href="/privacy-policy" className="underline hover:text-brand-red">
              Privacy Policy
            </Link>
            . <span className="text-brand-red">*</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-5 w-full rounded-full bg-brand-red px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
