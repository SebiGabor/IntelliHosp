import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
        throw new Error('Failed to fetch configuration');
      }
      const config = await response.json();

      // Handle Base64 PDF content
      this.pdfBlobUrl = config.pdf_content ? `data:application/pdf;base64,${config.pdf_content}` : null;

      // Ensure config.text_areas is an array before assigning
      if (Array.isArray(config.text_areas)) {
        this.textAreas = config.text_areas;
        this.textValues = Array(config.text_areas.length).fill('');
      } else {
        console.error('Invalid text areas data:', config.text_areas);
        // Handle this case accordingly, e.g., show error message
      }
    } catch (err) {
      console.error('Error fetching configuration:', err);
      // Handle error appropriately (e.g., show error message)
    }
  }

  saveCompletedPdf() {
    // Implement saving the completed PDF if needed
    console.log('Saving completed PDF');
  }

  handleTextAreaInput(index: number, event: Event) {
    this.textValues[index] = (event.target as HTMLInputElement).value;
  }

  render() {
    return html`
      <main>
        <h2>Fill in Text Boxes and View PDF</h2>
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
            : html`<p>No PDF available.</p>`}
        </sl-card>
        <!-- Optional: Button to save completed PDF -->
        <sl-button @click="${this.saveCompletedPdf}">Save Completed PDF</sl-button>
      </main>
    `;
  }
}
