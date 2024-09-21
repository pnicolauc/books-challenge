export class MailService {
  static sendBooksUploadReport(successfulEntries: number, errors: any[]) {
    // TODO send email
    console.log("Finished processing book upload");
    console.log(`successfulEntries: ${successfulEntries}`);
    console.log(`Total errors: ${errors.length}`);
  }
}
