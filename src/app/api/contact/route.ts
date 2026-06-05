import { Resend } from "resend";

type AppointmentRequest = {
  studentName?: unknown;
  guardianName?: unknown;
  phone?: unknown;
  email?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  program?: unknown;
  notes?: unknown;
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

  let body: AppointmentRequest;

  try {
    body = (await request.json()) as AppointmentRequest;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const studentName = getString(body.studentName);
  const guardianName = getString(body.guardianName);
  const phone = getString(body.phone);
  const email = getString(body.email);
  const preferredDate = getString(body.preferredDate);
  const preferredTime = getString(body.preferredTime);
  const program = getString(body.program);
  const notes = getString(body.notes);

  if (!studentName || !phone || !preferredDate || !preferredTime || !program) {
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
    subject: `New appointment request from ${studentName}`,
    text: [
      "New appointment request",
      "",
      `Student name: ${studentName}`,
      `Parent / guardian name: ${formatValue(guardianName)}`,
      `Phone number: ${phone}`,
      `Email: ${formatValue(email)}`,
      `Preferred date: ${preferredDate}`,
      `Preferred time: ${preferredTime}`,
      `Program of interest: ${program}`,
      "",
      "Notes:",
      formatValue(notes),
    ].join("\n"),
    html: `
      <h2>New appointment request</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Student name</strong></td><td>${escapeHtml(studentName)}</td></tr>
        <tr><td><strong>Parent / guardian name</strong></td><td>${escapeHtml(formatValue(guardianName))}</td></tr>
        <tr><td><strong>Phone number</strong></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(formatValue(email))}</td></tr>
        <tr><td><strong>Preferred date</strong></td><td>${escapeHtml(preferredDate)}</td></tr>
        <tr><td><strong>Preferred time</strong></td><td>${escapeHtml(preferredTime)}</td></tr>
        <tr><td><strong>Program of interest</strong></td><td>${escapeHtml(program)}</td></tr>
      </table>
      <h3>Notes</h3>
      <p>${escapeHtml(formatValue(notes)).replaceAll("\n", "<br />")}</p>
    `,
  });

  if (error) {
    return Response.json(
      {
        message: "Could not send appointment request.",

        error: error.message,
      },

      { status: 502 },
    );
  }

  return Response.json({ message: "Appointment request sent." });
}
