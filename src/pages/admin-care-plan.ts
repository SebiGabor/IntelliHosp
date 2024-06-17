import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { router, resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@customElement('admin-care-plan')
export class AdminCarePlan extends LitElement {
  @property({ type: File }) pdfFile: File | null = null;
  @property({ type: Array }) textAreas: any[] = [];

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

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.pdfFile = input.files[0];
      this.requestUpdate();
    }
  }

  addTextArea() {
    this.textAreas = [...this.textAreas, { x: 50, y: 50, width: 200, height: 50 }];
    this.requestUpdate();
  }

  async saveConfiguration() {
    if (!this.pdfFile) {
      alert('Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', this.pdfFile);
    formData.append('textAreas', JSON.stringify({ textAreas: this.textAreas }));

    try {
      const response = await fetch('/save-config', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      alert('Configuration saved!');
    } catch (error) {
      console.error('Error saving configuration:', error);
      // Handle error as needed
    }
  }

  navigateToFillPage() {
    router.navigate(resolveRouterPath('personnel-complete-plan'));
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
        let isDragging = false;

        element.addEventListener('mousedown', (event) => {
          if (event.button === 2) {
            isDragging = true;
          }
        });

        element.addEventListener('mouseup', (event) => {
          if (event.button === 2) {
            isDragging = false;
          }
        });

        interact(element)
          .draggable({
            allowFrom: '.text-area',
            onstart: (event) => {
              if (!isDragging) {
                event.interaction.stop();
              }
            },
            onmove: (event) => {
              if (isDragging) {
                const target = event.target as HTMLElement;
                const x = (parseFloat(target.getAttribute('data-x')!) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')!) || 0) + event.dy;
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x.toString());
                target.setAttribute('data-y', y.toString());

                this.textAreas[index].x = x;
                this.textAreas[index].y = y;
              }
            },
          })
          .resizable({
            allowFrom: '.text-area',
            edges: { left: true, right: true, bottom: true, top: true },
            modifiers: [
              interact.modifiers.restrictEdges({
                outer: 'parent',
              }),
              interact.modifiers.restrictSize({
                min: { width: 50, height: 20 },
              }),
            ],
            onstart: (event) => {
              if (event.button !== 0) {
                event.interaction.stop();
              }
            },
            onmove: (event) => {
              if (event.button === 0) {
                const target = event.target as HTMLElement;
                const rect = event.rect;

                target.style.width = `${rect.width}px`;
                target.style.height = `${rect.height}px`;

                this.textAreas[index].width = rect.width;
                this.textAreas[index].height = rect.height;
              }
            },
          });
      }
    });
  }

  render() {
    return html`
      <main>
        <h2>Configure PDF Text Boxes</h2>
        <input id="pdfFileInput" type="file" @change="${this.handleFileUpload}" />
        <sl-button @click="${this.addTextArea}">Add Text Area</sl-button>
        <sl-button @click="${this.saveConfiguration}">Save Configuration</sl-button>
        <sl-button @click="${this.navigateToFillPage}">Go to Fill Page</sl-button>
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
                        data-x="${area.x}"
                        data-y="${area.y}"
                        @contextmenu="${(e: Event) => e.preventDefault()}"
                      ></div>
                    `
                  )}
                </div>
              `
            : html`<p>Please upload a PDF file.</p>`}
        </sl-card>
      </main>
    `;
  }
}
