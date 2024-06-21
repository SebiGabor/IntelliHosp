import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PDFDocument, PDFPage, PDFTextField, rgb } from 'pdf-lib';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

@customElement('personnel-complete-plan')
export class PersonnelCompletePlan extends LitElement {
  @state() pdfFile: File | null = null;
  @state() pdfDoc: PDFDocument | null = null;
  @state() pdfPages: PDFPage[] = [];
  @state() currentPageIndex: number = 0;
  @state() pageDataUrls: string[] = [];
  @state() textFieldX: number = 0;
  @state() textFieldY: number = 0;
  @state() textFieldWidth: number = 200;
  @state() textFieldHeight: number = 20;
  @state() textBoxes: Array<{ x: number; y: number; width: number; height: number }> = [];
  @state() savedTextBoxes: Array<{ page: number; textBox: { fieldId: string, x: number; y: number; width: number; height: number; text: string | undefined } }> = [];
  @state() textFieldsConstructed: boolean = false;
  @state() pdfFetched: boolean = false;
  @state() pdfRenderedWidth: number = 1;
  @state() pdfRenderedHeight: number = 1;
  @state() havePdfRenderedDimensions: boolean = false;

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
    .text-field {
      position: absolute;
      border: 2px dashed #000;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: move;
    }
    .handle {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #000;
      cursor: pointer;
    }
    .handle.top-left {
      top: -5px;
      left: -5px;
    }
    .handle.top-right {
      top: -5px;
      right: -5px;
    }
    .handle.bottom-left {
      bottom: -5px;
      left: -5px;
    }
    .handle.bottom-right {
      bottom: -5px;
      right: -5px;
    }
    .small-button {
      padding: 2px;
      margin: 2px;
      font-size: 0.8rem;
      --size: 12px;
    }

    .small-button sl-icon {
      --size: 10px;
    }

    .text-field-container {
      position: relative;
    }

    .delete-button-container {
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px; /* Optional: Add padding for spacing */
    }

  `;

  async firstUpdated() {
    registerIconLibrary('default', {
      resolver: name => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0/icons/${name}.svg`
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchPdfConfig();
  }

  async fetchPdfConfig() {
    try {
      const response = await fetch('/fetch-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const { pdf_content, saved_text_boxes } = await response.json();

        if (pdf_content) {
          const pdfBytes = Uint8Array.from(atob(pdf_content), c => c.charCodeAt(0));
          this.pdfDoc = await PDFDocument.load(pdfBytes);

          this.updatePdfURLs();

          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          this.pdfFile = new File([blob], 'fetched.pdf', { type: 'application/pdf' });

          this.currentPageIndex = 0;

          if (saved_text_boxes) {
            this.savedTextBoxes = saved_text_boxes.map((entry: any) => ({
              page: entry.page,
              textBox: {
                fieldId: entry.textBox.fieldId,
                x: entry.textBox.x,
                y: entry.textBox.y,
                width: entry.textBox.width,
                height: entry.textBox.height,
                text: entry.textBox.text || ''
              }
            }));
          }

          this.pdfFetched = true;

        } else {
          console.error('PDF content not found in response data');
        }
      } else {
        console.error('Failed to fetch PDF configuration:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching PDF configuration:', error);
    }
  }

  async updatePdfURLs() {
    if(!this.pdfDoc) return;

    this.pdfPages = [];

    for (let i = 0; i < this.pdfDoc.getPageCount(); i++) {
      const [page] = await this.pdfDoc.copyPages(this.pdfDoc, [i]);
      this.pdfPages.push(page);
    }

    this.pageDataUrls = await Promise.all(this.pdfPages.map(async (page) => {
      const newDocument = await PDFDocument.create();
      const copiedPage = await newDocument.copyPages(this.pdfDoc!, [this.pdfPages.indexOf(page)]);
      newDocument.addPage(copiedPage[0]);
      const pdfBytes = await newDocument.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    }));

}

  pdfRenderedDimensions() {
    const pdfElement = this.shadowRoot?.querySelector('embed');
    const pdfRect = pdfElement?.getBoundingClientRect();
    this.pdfRenderedWidth = pdfRect?.width || 1;
    this.pdfRenderedHeight = pdfRect?.height || 1;
    this.havePdfRenderedDimensions = true;
  }

  async constructTextFields() {
    if (!this.pdfDoc) return;

    const form = this.pdfDoc.getForm();

    for (let i = 0; i < this.pdfDoc.getPageCount() || 0; i++) {
      const page = this.pdfDoc.getPage(i);

      const scaleX = (page.getWidth()) / this.pdfRenderedWidth;
      const scaleY = (page.getHeight()) / this.pdfRenderedHeight;

      this.savedTextBoxes.forEach((iterator) => {
        if (iterator.page == i) {
          const pdfTextField = form.createTextField(iterator.textBox.fieldId);
          pdfTextField.setText(iterator.textBox.text);

          pdfTextField.addToPage(page, {
            x: iterator.textBox.x * scaleX,
            y: (this.pdfRenderedHeight - iterator.textBox.y - iterator.textBox.height) * scaleY,
            width: iterator.textBox.width * scaleX,
            height: iterator.textBox.height * scaleY,
            borderWidth: 0,
            textColor: rgb(0, 0, 0),
            backgroundColor: rgb(1, 1, 1),
            borderColor: rgb(0, 0, 0),
          });
        }
      });
    }
    this.textFieldsConstructed = true;

    this.updatePdfURLs();

    this.requestUpdate();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (this.pageDataUrls.length > 0 && !this.havePdfRenderedDimensions) {
      this.pdfRenderedDimensions();
    }

    if (this.pdfFetched && !this.textFieldsConstructed && this.havePdfRenderedDimensions) {
      this.constructTextFields();
    }
  }

  navigateToPage(index: number) {
    if (index >= 0 && index < this.pdfPages.length) {
      this.currentPageIndex = index;
    }
  }

  async handleDownloadPdf() {
    if (this.pageDataUrls.length === 0 || !this.pdfDoc) return;

    const finalPdfBytes = await this.pdfDoc.save();
    const finalBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(finalBlob);
    downloadLink.download = 'modified_combined_pdf.pdf';
    downloadLink.click();

    //this.updateTextFields();
  }

  async handleSaveInDatabase(event: Event) {
    event.preventDefault();

    this.updateTextFields();
  }

  async updateTextFields() {
    if (this.pdfDoc && this.savedTextBoxes.length > 0) {
      const form = this.pdfDoc.getForm();

      if (!form) {
        console.warn('No form found in the PDF document.');
        return;
      }

      for (const savedTextBox of this.savedTextBoxes) {
        const { page, textBox } = savedTextBox;
        if (page !== this.currentPageIndex) continue;

        const fieldId = textBox.fieldId;
        const text = textBox.text;

        const field = form.getField(fieldId) as PDFTextField | undefined;
        field?.setText(text || '');
      }
    }
  }

  render() {
    const pageDataUrl = this.pageDataUrls[this.currentPageIndex];

    return html`
      <app-header ?enableBack="${true}" .backPath="${'personnel-home'}" .enableTitle="${false}"></app-header>

      <main>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-left: 10%; padding-top: 6px;">
          ${this.pageDataUrls.length > 0 ? html`
            <div style="display: flex; align-items: center; gap: 10px; margin-right: 5%;">
              <sl-button variant="primary" @click="${() => this.navigateToPage(this.currentPageIndex - 1)}" ?disabled="${this.currentPageIndex === 0}">
                <sl-icon name="arrow-left-square-fill"></sl-icon>
              </sl-button>
              <sl-button variant="primary" @click="${() => this.navigateToPage(this.currentPageIndex + 1)}" ?disabled="${this.currentPageIndex === this.pdfPages.length - 1}">
                <sl-icon name="arrow-right-square-fill"></sl-icon>
              </sl-button>
            </div>
            <div style="margin-right: 5%;">
              <sl-button variant="primary" @click="${this.handleSaveInDatabase}">
                Salvează configurația <sl-icon name="cloud-plus-fill"></sl-icon>
              </sl-button>
            </div>
            <div style="margin-right: 5%;">
              <sl-button variant="primary" @click="${this.handleDownloadPdf}">
                Descarcă pdf <sl-icon name="file-earmark-arrow-down-fill"></sl-icon>
              </sl-button>
            </div>
          ` : ''}
        </div>
        <div style="position: relative;">
            <embed src="${pageDataUrl}#view=FitW" type="application/pdf" style="width: 100%; height: 600px;">
        </div>
      </main>
    `;
  }
}