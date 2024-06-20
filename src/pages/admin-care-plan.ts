import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PDFDocument, PDFPage } from 'pdf-lib';

@customElement('admin-care-plan')
export class AdminCarePlan extends LitElement {
  @state() pdfFile: File | null = null;
  @state() pdfPages: PDFPage[] = [];
  @state() currentPageIndex: number = 0;
  @state() pageDataUrls: string[] = [];

  static styles = css`
    input[type="file"] {
      margin: 20px 0;
    }
    embed {
      border: none;
      width: 100%;
      height: 600px;
      position: relative;
    }
    button {
      margin: 10px;
    }
  `;

  async handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.pdfFile = input.files[0];
      const fileArrayBuffer = await this.pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);

      this.pdfPages = [];
      for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const [page] = await pdfDoc.copyPages(pdfDoc, [i]);
        this.pdfPages.push(page);
      }

      this.pageDataUrls = await Promise.all(this.pdfPages.map(async (page) => {
        const newDocument = await PDFDocument.create();
        const copiedPage = await newDocument.copyPages(pdfDoc, [this.pdfPages.indexOf(page)]);
        newDocument.addPage(copiedPage[0]);
        const pdfBytes = await newDocument.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
      }));

      this.currentPageIndex = 0;
    }
  }

  navigateToPage(index: number) {
    if (index >= 0 && index < this.pdfPages.length) {
      this.currentPageIndex = index;
    }
  }

  render() {
    const pageDataUrl = this.pageDataUrls[this.currentPageIndex];

    return html`
      <div>
        <input type="file" accept="application/pdf" @change="${this.handleFileUpload}" />
        ${this.pageDataUrls.length > 0 ? html`
          <div>
            <div style="position: relative;">
              <embed src="${pageDataUrl}#view=Fit&toolbar=0" type="application/pdf" style="width: 100%; height: 600px; position: absolute; top: 0; left: 0;">
              <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);">
                <button @click="${() => this.navigateToPage(this.currentPageIndex - 1)}" ?disabled="${this.currentPageIndex === 0}">Previous Page</button>
                <button @click="${() => this.navigateToPage(this.currentPageIndex + 1)}" ?disabled="${this.currentPageIndex === this.pdfPages.length - 1}">Next Page</button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}
