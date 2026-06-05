import { Resend } from "resend";

type CourseEnquiryRequest = {
  courseSlug?: unknown;
  courseTitle?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const getString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const formatValue = (value: string) => value || "-";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function POST(request: Request) {
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!process.env.RESEND_API_KEY || !receiverEmail) {
    return Response.json(
      { message: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: CourseEnquiryRequest;

  try {
    body = (await request.json()) as CourseEnquiryRequest;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const courseSlug = getString(body.courseSlug);
  const courseTitle = getString(body.courseTitle);
  const name = getString(body.name);
  const email = getString(body.email);
  const phone = getString(body.phone);
  const message = getString(body.message);

  if (!courseSlug || !courseTitle || !name || !phone) {
    return Response.json(
      { message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_SENDER_EMAIL ?? "Edukatory <onboarding@resend.dev>",
    to: receiverEmail,
    replyTo: email || undefined,
    subject: `New course enquiry: ${courseTitle}`,
    text: [
      "New course enquiry",
      "",
      `Course: ${courseTitle}`,
      `Course slug: ${courseSlug}`,
      `Name: ${name}`,
      `Phone number: ${phone}`,
      `Email: ${formatValue(email)}`,
      "",
      "Message:",
      formatValue(message),
    ].join("\n"),
    html: `
      <h2>New course enquiry</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Course</strong></td><td>${escapeHtml(courseTitle)}</td></tr>
        <tr><td><strong>Course slug</strong></td><td>${escapeHtml(courseSlug)}</td></tr>
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Phone number</strong></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(formatValue(email))}</td></tr>
      </table>
      <h3>Message</h3>
      <p>${escapeHtml(formatValue(message)).replaceAll("\n", "<br />")}</p>
    `,
  });

  if (error) {
    return Response.json(
      { message: "Could not send enquiry." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Enquiry sent." });
}
