import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('admin-care-plan')
export class AdminCarePlan extends LitElement {
  @property({ type: File }) pdfFile: File | null = null;
  @property({ type: Array }) textAreas: any[] = [];
  @property({ type: Array }) textValues: string[] = [];

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
      border: 1px solid black;
      background: rgba(255, 255, 255, 0.5);
      resize: both;
      overflow: auto;
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
    }
  `;

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.pdfFile = input.files[0];
      this.requestUpdate();
    }
  }

  addTextArea() {
    this.textAreas = [...this.textAreas, { x: 50, y: 50, width: 200, height: 50 }];
    this.textValues = [...this.textValues, ''];
    this.requestUpdate();
  }

  async saveConfiguration() {
    const config = { textAreas: this.textAreas };
    const response = await fetch('/api/save-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!response.ok) {
      throw new Error('Failed to save configuration');
    }
    alert('Configuration saved!');
  }

  async fetchConfiguration() {
    const response = await fetch('/api/fetch-config', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch configuration');
    }
    const config = await response.json();
    this.textAreas = config.textAreas;
    this.textValues = Array(config.textAreas.length).fill('');
    this.requestUpdate();
  }

  handleTextAreaInput(index: number, event: Event) {
    this.textValues[index] = (event.target as HTMLInputElement).value;
  }

  async saveCompletedPdf() {
    if (this.pdfFile) {
      const { PDFDocument, rgb } = await import('pdf-lib');
      const { saveAs } = await import('file-saver');
      const existingPdfBytes = await this.pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const page = pages[0];

      this.textAreas.forEach((area, i) => {
        const { x, y, width, height } = area;
        page.drawText(this.textValues[i], {
          x: page.getWidth() - x - width,
          y: page.getHeight() - y - height,
          size: 12,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'completed.pdf');
    }
  }

  firstUpdated() {
    this.initializeDraggables();
  }

  updated() {
    this.initializeDraggables();
  }

  async initializeDraggables() {
    const interact = (await import('interactjs')).default;
    this.textAreas.forEach((_, index) => {
      const element = this.shadowRoot!.querySelector(`#text-area-${index}`) as HTMLElement;
      if (element) {
        interact(element)
          .draggable({
            onmove: (event) => {
              const target = event.target as HTMLElement;
              const x = (parseFloat(target.getAttribute('data-x')!) || 0) + event.dx;
              const y = (parseFloat(target.getAttribute('data-y')!) || 0) + event.dy;
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x.toString());
              target.setAttribute('data-y', y.toString());

              this.textAreas[index].x = x;
              this.textAreas[index].y = y;
            },
          })
          .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
          })
          .on('resizemove', (event) => {
            const target = event.target as HTMLElement;
            const width = event.rect.width;
            const height = event.rect.height;

            target.style.width = `${width}px`;
            target.style.height = `${height}px`;

            this.textAreas[index].width = width;
            this.textAreas[index].height = height;
          });
      }
    });
  }

  render() {
    return html`
      <main>
        <h2>Upload and Configure PDF</h2>
        <input type="file" @change="${this.handleFileUpload}" />
        <sl-button @click="${this.addTextArea}">Add Text Area</sl-button>
        <sl-button @click="${this.saveConfiguration}">Save Configuration</sl-button>
        <sl-card>
          ${this.pdfFile
            ? html`
                <div id="pdf-container">
                  <embed id="pdf-render" src="${URL.createObjectURL(this.pdfFile)}" type="application/pdf" />
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
            : html`<p>Please upload a PDF file.</p>`}
        </sl-card>
        <sl-button @click="${this.saveCompletedPdf}">Save Completed PDF</sl-button>
      </main>
    `;
  }
}
