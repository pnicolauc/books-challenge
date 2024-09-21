import { config } from "dotenv";
import Mailjet from "node-mailjet";

config();

if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
  throw new Error("MAILJET_API_KEY and MAILJET_API_SECRET are required");
}

if (!process.env.MAIL_SENDER) {
  throw new Error("MAIL_SENDER is required");
}

if (process.env.SYSTEM_ADMIN_EMAIL === undefined) {
  throw new Error("SYSTEM_ADMIN_EMAIL is required");
}

const mailJet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET,
});

export class MailService {
  static async sendBooksUploadReport(successfulEntries: number, errors: any[]) {
    try {
      const request = await mailJet.post("send", { version: "v3.1" }).request({
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
            Subject: "Your email flight plan!",
            TextPart:
              "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
            HTMLPart:
              '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
          },
        ],
      });

      // TODO send email
      console.log("Finished processing book upload");
      console.log(`successfulEntries: ${successfulEntries}`);
      console.log(`Total errors: ${errors.length}`);
    } catch (e) {
      console.error("Error sending email", e);
    }
  }
}
