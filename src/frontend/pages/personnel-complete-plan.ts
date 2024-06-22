import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

@customElement('personnel-complete-plan')
export class PersonnelCompletePlan extends LitElement {
  @state() pdfFile: File | null = null;
  @state() pdfDoc: PDFDocument | null = null;
  @state() pdfDocCopy: PDFDocument | null = null;
  @state() pdfPages: PDFPage[] = [];
  @state() currentPageIndex: number = 0;
  @state() pageDataUrls: string[] = [];
  @state() textFieldX: number = 0;
  @state() textFieldY: number = 0;
  @state() textFieldWidth: number = 200;
  @state() textFieldHeight: number = 20;
  @state() textBoxes: Array<{ x: number; y: number; width: number; height: number }> = [];
  @state() savedTextBoxes: Array<{ page: number; textBox: { fieldId: string, x: number; y: number; width: number; height: number; text: string | undefined }; scale: {x: number; y: number} }> = [];
  @state() textFieldsConstructed: boolean = false;
  @state() pdfFetched: boolean = false;
  @state() pdfWidth: number = -1;
  @state() recipientEmail: string = '';

  static styles = css`
    input[type="file"] {
      margin: 20px 0;
    }
    .pdf-container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 600px;
      overflow: auto;
      border: 1px solid #000;
      margin: 0 auto;
    }

    embed {
      width: auto;
      max-height: 100%;
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
      position: absolute;
      top: 0;
      left: 0;
    }

    .delete-button-container {
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px;
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
      const response = await fetch('/fetch-patient-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientID: localStorage.getItem('selectedPatientId')
        })
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
              },
              scale: {
                x: entry.scale.x,
                y: entry.scale.y
              }
            }));
          }

          console.log(this.savedTextBoxes);

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

  constructTextFields() {
    if (!this.pdfDoc) return;

    const pdfElement = this.shadowRoot?.querySelector('embed');
    const pdfRect = pdfElement?.getBoundingClientRect();
    const pdfRenderedHeight = pdfRect?.height || 1;

    const form = this.pdfDoc.getForm();

    for (let i = 0; i < this.pdfDoc.getPageCount() || 0; i++) {
      const page = this.pdfDoc.getPage(i);

      this.savedTextBoxes.forEach((iterator) => {
        if (iterator.page == i) {
          const pdfTextField = form.createTextField(iterator.textBox.fieldId);
          pdfTextField.setText(iterator.textBox.text);
          pdfTextField.addToPage(page, {
            x: iterator.textBox.x * iterator.scale.x,
            y: (pdfRenderedHeight - iterator.textBox.y - iterator.textBox.height) * iterator.scale.y,
            width: iterator.textBox.width * iterator.scale.x,
            height: iterator.textBox.height * iterator.scale.y,
            borderWidth: 0,
            textColor: rgb(0, 0, 0),
            backgroundColor: rgb(1, 1, 1),
            borderColor: rgb(0, 0, 0),
          });
        }
      });
    }

    form.flatten();
    this.textFieldsConstructed = true;

    this.updatePdfURLs();
  }

  navigateToPage(index: number) {
    if (index >= 0 && index < this.pdfPages.length) {
      this.currentPageIndex = index;
    }
    this.requestUpdate();
  }

  async handleDownloadPdf() {
    if (this.pageDataUrls.length === 0 || !this.pdfDoc) return;

    this.pdfDocCopy = await this.pdfDoc.copy();

    this.constructTextFields();

    const finalPdfBytes = await this.pdfDoc.save();
    const finalBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(finalBlob);
    downloadLink.download = 'configuratie_plan_ingrijiri.pdf';
    downloadLink.click();

    this.pdfDoc = await this.pdfDocCopy.copy();
    this.updatePdfURLs();
    this.requestUpdate();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (this.pdfFetched && this.pdfWidth === -1) {
      this.getPdfWidth();
    }
  }

  async handleSaveInDatabase(event: Event) {
    event.preventDefault();

    try {
      const selectedPatientId = localStorage.getItem('selectedPatientId');
      if (!selectedPatientId) {
        throw new Error('selectedPatientId is missing in localStorage');
      }

      const requestBody = {
        patientID: selectedPatientId,
        textBoxes: this.savedTextBoxes.map(tb => ({
          page: tb.page,
          textBox: {
            fieldId: tb.textBox.fieldId,
            x: tb.textBox.x,
            y: tb.textBox.y,
            width: tb.textBox.width,
            height: tb.textBox.height,
            text: tb.textBox.text || '',
          },
          scale: {
            x: tb.scale.x,
            y: tb.scale.y
          }
        })),
      };

      console.log('Sending request with body:', requestBody);

      const response = await fetch('/update-patient-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('Plan salvat cu succes!');
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Bad Request:', errorData);
        alert(`Eroare la salvarea planului: ${errorData.error}`);
      } else if (response.status === 500) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert(`Eroare la salvarea planului: ${errorData.error}`);
      } else {
        alert('Eroare la salvarea planului');
        console.error('Failed to save plan:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Eroare la salvarea planului');
    }
  }

  handleTextInput(event: Event, fieldId: string) {
    const input = event.target as HTMLInputElement;
    const textBox = this.savedTextBoxes.find(tb => tb.textBox.fieldId === fieldId);
    if (textBox) {
      textBox.textBox.text = input.value;
    }
    this.requestUpdate();
  }

  getPdfWidth() {
    this.pdfWidth = this.shadowRoot?.querySelector('embed')?.getBoundingClientRect().left || 0;
  }

  async handleSendEmail() {
    if (this.pageDataUrls.length === 0 || !this.pdfDoc) return;

    try {
      this.pdfDocCopy = await this.pdfDoc.copy();
      this.constructTextFields();
      const finalPdfBytes = await this.pdfDoc.save();

      const response = await fetch('/send-email-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pdfBytes: Array.from(finalPdfBytes),
          email: this.recipientEmail
        })
      });

      if (response.ok) {
        alert('Email trimis cu success!');
        this.pdfDoc = await this.pdfDocCopy?.copy();
      } else {
        const errorData = await response.json();
        console.error('Failed to send email:', errorData);
        alert(`Eroare la trimitere email: ${errorData.error}`);
        this.pdfDoc = await PDFDocument.create();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Eroare la trimitere email');
    } finally {
      this.updatePdfURLs();
      this.requestUpdate();
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
            <div style="display: flex; align-items: center; gap: 10px;">
              <sl-input placeholder="Adresă de email" type="email" @input="${(e: Event) => this.recipientEmail = (e.target as HTMLInputElement).value}"></sl-input>
              <sl-button variant="primary" @click="${this.handleSendEmail}" ?disabled="${!this.recipientEmail}">
                Trimite email <sl-icon name="envelope-fill"></sl-icon>
              </sl-button>
            </div>
          ` : ''}
        </div>
        <div style="display: flex; justify-content: center; position: relative;">
          <div class="pdf-container">
            <embed src="${pageDataUrl}#view=Fit&toolbar=0" style="width: ${600 * this.pdfPages[this.currentPageIndex].getWidth() / this.pdfPages[this.currentPageIndex].getHeight()}px; height: 600px;" type="application/pdf">
            <div class="text-field-container">
              ${this.savedTextBoxes
                .filter(tb => tb.page === this.currentPageIndex)
                .map(tb => html`
                  <div
                    class="text-field"
                    style="
                      position: absolute;
                      left: ${tb.textBox.x + this.pdfWidth}px;
                      top: ${tb.textBox.y}px;
                      width: ${tb.textBox.width}px;
                      height: ${tb.textBox.height}px;
                    "
                  >
                    <input
                      type="text"
                      .value="${tb.textBox.text || ''}"
                      @input="${(e: Event) => this.handleTextInput(e, tb.textBox.fieldId)}"
                      style="
                        width: 100%;
                        height: 100%;
                        border: none;
                        background: transparent;
                      "
                    />
                  </div>
                `)}
            </div>
          </div>
        </div>
      </main>
    `;
  }

}
