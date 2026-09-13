import { type Consultation, programLabels, timeLabels } from "./validation";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export function consultationEmail(data: Consultation) {
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${data.preferredDate}T00:00:00Z`));
  const sections: { title: string; rows: [string, string][] }[] = [
    {
      title: "SOURCE INFORMATION",
      rows: data.campaign
        ? [
            ["Venue / Establishment", data.campaign.establishment],
            ["Promo Code", data.promoCode],
            ["Source", "QR Code"],
          ]
        : [
            ["Source", "Website"],
            ["Promo Code", data.promoCode],
          ],
    },
    {
      title: "STUDENT INFORMATION",
      rows: [
        ["Student Name", data.studentName],
        ["Guardian Name", data.guardianName],
        ["Phone", data.phone],
        ["Email", data.email],
      ],
    },
    {
      title: "CONSULTATION DETAILS",
      rows: [
        ["Preferred Date", date],
        ["Preferred Time", timeLabels[data.preferredTime]],
        ["Program of Interest", programLabels[data.program]],
      ],
    },
    { title: "ADDITIONAL INFORMATION", rows: [["Notes", data.notes]] },
  ];
  return {
    subject: data.campaign
      ? `${data.campaign.establishment} - Book Consultation`
      : "New Book Consultation - ELS Pattaya",
    text:
      "NEW BOOK CONSULTATION REQUEST\n\n" +
      sections
        .map(
          ({ title, rows }) =>
            `${title}\n--------------------------------\n\n${rows.map(([label, value]) => `${label}: ${value || "Not provided"}`).join("\n")}`,
        )
        .join("\n\n\n"),
    html:
      "<h2>NEW BOOK CONSULTATION REQUEST</h2>" +
      sections
        .map(
          ({ title, rows }) =>
            `<h3>${title}</h3><table cellpadding="8" cellspacing="0" style="border-collapse:collapse">${rows.map(([label, value]) => `<tr><th align="left" valign="top">${label}</th><td>${escapeHtml(value || "Not provided").replaceAll("\n", "<br />")}</td></tr>`).join("")}</table>`,
        )
        .join(""),
  };
}
