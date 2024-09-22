import { config } from "dotenv";
import Mailjet from "node-mailjet";

config();

let sendEmail = false;
let mailJet: Mailjet;

if (
  process.env.MAILJET_API_KEY &&
  process.env.MAILJET_API_SECRET &&
  process.env.MAIL_SENDER &&
  process.env.SYSTEM_ADMIN_EMAIL
) {
  sendEmail = true;

  mailJet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_API_SECRET,
  });
} else {
  console.log("Email not configured. Will log to console instead.");
}

export class MailService {
  static async sendBooksUploadReport(successfulEntries: number, errors: any[]) {
    if(!sendEmail) {
      console.log("Finished processing book upload");
      console.log(`successfulEntries: ${successfulEntries}`);
      console.log(`Total errors: ${errors.length}`);
      return;
    }

    try {
      await mailJet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: process.env.MAIL_SENDER,
              Name: "No Reply Reports",
            },
            To: [
              {
                Email: process.env.SYSTEM_ADMIN_EMAIL,
                Name: "System Admin",
              },
            ],
            Subject: "Book Upload Report",
            TextPart: `A book upload has been processed Here is the report. ${successfulEntries} books were successfully uploaded. ${errors.length} errors occurred.`,
            HTMLPart: `<h3>A book upload has been processed Here is the report.</h3><br />May the delivery force be with you! ${successfulEntries} books were successfully uploaded. ${
              errors.length
            } errors occurred.<br /><ul>${errors
              .map((error) => `<li>${JSON.stringify(error)}</li>`)
              .join("")}</ul>`,
          },
        ],
      });
    } catch (e) {
      console.error("Error sending email", e);
    }
  }
}
