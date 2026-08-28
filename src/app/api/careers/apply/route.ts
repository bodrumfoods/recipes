import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getJobById } from "@/lib/jobs";
import { sendApplicationEmails } from "@/lib/email";

const STORAGE_DIR = path.join(process.cwd(), ".data", "careers-applications");
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const jobId = String(formData.get("jobId") ?? "");
  const job = getJobById(jobId);
  if (!job || job.status !== "open") {
    return fail("This job posting is no longer accepting applications.", 404);
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const rightToWork = String(formData.get("rightToWork") ?? "");
  const consent = formData.get("consent");

  if (!firstName || !lastName || !email || !phone || !rightToWork || !consent) {
    return fail("Please complete all required fields.", 400);
  }
  if (!EMAIL_PATTERN.test(email)) {
    return fail("Please enter a valid email address.", 400);
  }

  const cv = formData.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    return fail("Please attach your CV.", 400);
  }
  if (cv.size > MAX_FILE_SIZE) {
    return fail("CV file must be smaller than 5MB.", 400);
  }
  if (!ALLOWED_CV_TYPES.includes(cv.type)) {
    return fail("CV must be a PDF or Word document.", 400);
  }

  const reference = `BF-${Date.now().toString(36).toUpperCase()}-${randomUUID()
    .slice(0, 4)
    .toUpperCase()}`;
  const cvExtension = path.extname(cv.name) || ".pdf";
  const cvBuffer = Buffer.from(await cv.arrayBuffer());

  const postcode = String(formData.get("postcode") ?? "");
  const hearAboutUs = String(formData.get("hearAboutUs") ?? "");
  const availableFrom = String(formData.get("availableFrom") ?? "");
  const noticePeriod = String(formData.get("noticePeriod") ?? "");
  const drivingLicence = String(formData.get("drivingLicence") ?? "");
  const drivingExperience = String(formData.get("drivingExperience") ?? "");
  const forkliftLicence = String(formData.get("forkliftLicence") ?? "");
  const coverLetter = String(formData.get("coverLetter") ?? "");

  const record = {
    reference,
    jobId: job.id,
    jobTitle: job.title,
    submittedAt: new Date().toISOString(),
    firstName,
    lastName,
    email,
    phone,
    postcode,
    hearAboutUs,
    rightToWork,
    availableFrom,
    noticePeriod,
    drivingLicence,
    drivingExperience,
    forkliftLicence,
    coverLetter,
    equalOpportunities: {
      gender: String(formData.get("eoGender") ?? ""),
      ethnicity: String(formData.get("eoEthnicity") ?? ""),
      disability: String(formData.get("eoDisability") ?? ""),
    },
    cvFileName: cv.name,
  };

  try {
    const applicationDir = path.join(STORAGE_DIR, reference);
    await mkdir(applicationDir, { recursive: true });
    await writeFile(path.join(applicationDir, `cv${cvExtension}`), cvBuffer);
    await writeFile(
      path.join(applicationDir, "application.json"),
      JSON.stringify(record, null, 2)
    );
  } catch (error) {
    console.error("[careers] Failed to write application to local storage:", error);
  }

  const { sent, error: emailError } = await sendApplicationEmails({
    reference,
    jobTitle: job.title,
    jobLocation: job.location,
    firstName,
    lastName,
    email,
    phone,
    postcode,
    rightToWork,
    availableFrom,
    noticePeriod,
    drivingLicence,
    drivingExperience,
    forkliftLicence,
    hearAboutUs,
    coverLetter,
    cvFileName: cv.name,
    cvBuffer,
  });

  return NextResponse.json({ ok: true, reference, emailed: sent, emailError });
}
