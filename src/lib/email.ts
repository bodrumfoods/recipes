import { Resend } from "resend";

const NOTIFICATION_EMAIL = process.env.CAREERS_NOTIFICATION_EMAIL || "hello@bodrumfoods.co.uk";
const FROM_EMAIL = process.env.CAREERS_FROM_EMAIL || "Bodrum Foods Careers <careers@bodrumfoods.co.uk>";

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) resendClient = new Resend(apiKey);
  return resendClient;
}

export interface ApplicationEmailData {
  reference: string;
  jobTitle: string;
  jobLocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  rightToWork: string;
  availableFrom: string;
  noticePeriod: string;
  drivingLicence: string;
  drivingExperience: string;
  forkliftLicence: string;
  hearAboutUs: string;
  coverLetter: string;
  cvFileName: string;
  cvBuffer: Buffer;
}

function fmt(value: string): string {
  return value.trim() || "—";
}

async function sendRecruiterNotification(client: Resend, data: ApplicationEmailData) {
  const rows: [string, string][] = [
    ["Reference", data.reference],
    ["Role", `${data.jobTitle} (${data.jobLocation})`],
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Postcode", fmt(data.postcode)],
    ["Right to work in the UK", fmt(data.rightToWork)],
    ["Earliest start date", fmt(data.availableFrom)],
    ["Notice period", fmt(data.noticePeriod)],
    ["Driving licence", fmt(data.drivingLicence)],
    ["Driving experience", fmt(data.drivingExperience)],
    ["Forklift licence", fmt(data.forkliftLicence)],
    ["Heard about us via", fmt(data.hearAboutUs)],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap;">${label}</td><td style="padding:4px 0;font-weight:600;">${value}</td></tr>`
    )
    .join("");

  const coverLetterHtml = data.coverLetter.trim()
    ? `<p style="margin-top:16px;"><strong>Cover letter:</strong></p><p style="white-space:pre-wrap;">${data.coverLetter.trim()}</p>`
    : "";

  await client.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `New application: ${data.jobTitle} — ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family:sans-serif;color:#1a1a1a;">
        <h2 style="margin-bottom:4px;">New job application received</h2>
        <table style="border-collapse:collapse;margin-top:12px;">${rowsHtml}</table>
        ${coverLetterHtml}
        <p style="margin-top:16px;color:#666;font-size:13px;">CV attached to this email.</p>
      </div>
    `,
    attachments: [
      {
        filename: data.cvFileName,
        content: data.cvBuffer,
      },
    ],
  });
}

async function sendApplicantConfirmation(client: Resend, data: ApplicationEmailData) {
  await client.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `We've received your application — ${data.jobTitle}`,
    html: `
      <div style="font-family:sans-serif;color:#1a1a1a;">
        <h2>Thanks for applying, ${data.firstName}!</h2>
        <p>We've received your application for <strong>${data.jobTitle}</strong> at Bodrum Foods.
        Our recruitment team will review it and get back to you by email.</p>
        <p>Your reference number is <strong>${data.reference}</strong> — please quote it in any
        follow-up.</p>
        <p style="margin-top:24px;color:#666;font-size:13px;">Bodrum Foods Careers</p>
      </div>
    `,
  });
}

export async function sendApplicationEmails(data: ApplicationEmailData): Promise<{
  sent: boolean;
  error?: string;
}> {
  const client = getResendClient();
  if (!client) {
    console.warn(
      "[careers] RESEND_API_KEY is not set — skipping application email notifications."
    );
    return { sent: false, error: "Email is not configured on the server." };
  }

  try {
    await sendRecruiterNotification(client, data);
    await sendApplicantConfirmation(client, data);
    return { sent: true };
  } catch (error) {
    console.error("[careers] Failed to send application emails:", error);
    return { sent: false, error: "Failed to send email notification." };
  }
}
