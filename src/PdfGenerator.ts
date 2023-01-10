import puppeteer from 'puppeteer';

class PdfGenerator {
  private puppeteerInstance: puppeteer.Browser;
  async init() {
    this.puppeteerInstance = await puppeteer.launch();
  };

  async generatePdf(html: string): Promise<Buffer> {
    const page = await this.puppeteerInstance.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const base64PdfString = await page.pdf({
      format: 'A4',
      margin: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
      }
    });
    return base64PdfString;
  }
}

export default new PdfGenerator();