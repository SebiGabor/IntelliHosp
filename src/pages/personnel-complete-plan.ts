import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PDFDocument, rgb } from 'pdf-lib';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('personnel-complete-plan')
export class PersonnelCompletePlan extends LitElement {
  @property({ type: Array }) textAreas: any[] = [];
  @property({ type: Array }) textValues: string[] = [];
  @property({ type: String }) pdfBlobUrl: string | null = null;

  static styles = css`
    :host {
      display: block;
      margin: auto;
      max-width: 800px;
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    sl-card {
      width: 100%;
      max-width: 1200px;
    }

    .text-area {
      position: absolute;
      border: 2px dashed #000;
      background: rgba(255, 255, 255, 0.7);
      resize: none;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .text-area input {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      text-align: center;
      font-size: 14px;
      font-family: Arial, sans-serif;
    }

    #pdf-container {
      position: relative;
      width: 100%;
      height: 600px;
      overflow: auto;
      border: 1px solid #ccc;
    }

    #pdf-render {
      width: 100%;
      height: 100%;
      display: block;
    }

    sl-button {
      margin: 10px;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchConfiguration();
  }

  async fetchConfiguration() {
    try {
      const response = await fetch('/fetch-config', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Eroare la preluarea configurării');
      }
      const config = await response.json();

      this.pdfBlobUrl = config.pdf_content ? `data:application/pdf;base64,${config.pdf_content}` : null;

      if (Array.isArray(config.text_areas)) {
        this.textAreas = config.text_areas;
        this.textValues = Array(config.text_areas.length).fill('');
      } else {
        console.error('Date invalide pentru zonele de text:', config.text_areas);
      }
    } catch (err) {
      console.error('Eroare la preluarea configurării:', err);
    }
  }

  saveCompletedPdf() {
    if (!this.pdfBlobUrl) {
      console.error('Nu există PDF disponibil pentru a fi salvat completat.');
      return;
    }

    try {
      fetch(this.pdfBlobUrl)
        .then(res => res.arrayBuffer())
        .then(async data => {

          const existingPdfBytes = new Uint8Array(data);
          const pdfDoc = await PDFDocument.load(existingPdfBytes);

          const firstPage = pdfDoc.getPages()[0];

          this.textAreas.forEach((area, index) => {
            const textValue = this.textValues[index];
            const fontSize = 14;
            const { x, y, height } = area;

            firstPage.drawText(textValue, {
              x,
              y: firstPage.getHeight() - y - height + fontSize / 2,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
          });

          const pdfBytes = await pdfDoc.save();

          const file = new Blob([pdfBytes], { type: 'application/pdf' });

          const fileURL = URL.createObjectURL(file);

          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = fileURL;
          a.download = 'plan_ingrijiri.pdf';
          document.body.appendChild(a);
          a.click();

          URL.revokeObjectURL(fileURL);
          document.body.removeChild(a);
        });
    } catch (error) {
      console.error('Eroare la salvarea PDF completat:', error);
    }
  }

  handleTextAreaInput(index: number, event: Event) {
    this.textValues[index] = (event.target as HTMLInputElement).value;
  }

  render() {
    return html`
      <main>
        <h2>Completați Casetele de Text și Vizualizați PDF-ul</h2>
        <sl-card>
          ${this.pdfBlobUrl
            ? html`
                <div id="pdf-container">
                  <embed id="pdf-render" src="${this.pdfBlobUrl}" type="application/pdf" />
                  ${this.textAreas.map(
                    (area, index) => html`
                      <div
                        id="text-area-${index}"
                        class="text-area"
                        style="left: ${area.x}px; top: ${area.y}px; width: ${area.width}px; height: ${area.height}px;"
                      >
                        <input
                          type="text"
                          style="width: 100%; height: 100%; border: none; background: transparent;"
                          .value="${this.textValues[index]}"
                          @input="${(e: Event) => this.handleTextAreaInput(index, e)}"
                        />
                      </div>
                    `
                  )}
                </div>
              `
            : html`<p>Nu există PDF disponibil.</p>`}
        </sl-card>
        <sl-button @click="${this.saveCompletedPdf}">Salvați PDF-ul Completat</sl-button>
      </main>
    `;
  }
}
