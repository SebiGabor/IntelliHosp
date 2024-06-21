import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';

@customElement('admin-care-plan')
export class AdminCarePlan extends LitElement {
  @state() pdfFile: File | null = null;
  @state() pdfDoc: PDFDocument | null = null;
  @state() pdfPages: PDFPage[] = [];
  @state() currentPageIndex: number = 0;
  @state() pageDataUrls: string[] = [];
  @state() isAddingTextField: boolean = false;
  @state() textFieldX: number = 0;
  @state() textFieldY: number = 0;
  @state() textFieldWidth: number = 200;
  @state() textFieldHeight: number = 20;
  @state() dragHandleSize: number = 10;
  @state() activeHandle: string | null = null;
  @state() initialMouseX: number = 0;
  @state() initialMouseY: number = 0;
  @state() initialTextFieldX: number = 0;
  @state() initialTextFieldY: number = 0;
  @state() initialTextFieldWidth: number = 0;
  @state() initialTextFieldHeight: number = 0;
  @state() isDragging: boolean = false;
  @state() initialDragX: number = 0;
  @state() initialDragY: number = 0;
  @state() isConfirmingTextField: boolean = false;
  @state() textBoxes: Array<{ x: number; y: number; width: number; height: number }> = [];
  @state() savedTextBoxes: Array<{ page: number; textBox: { fieldId: string, x: number; y: number; width: number; height: number; text: string | undefined }; confirmed: boolean; scale: {x: number; y: number} }> = [];
  @state() pdfHeight: number = 0;

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
    .confirmed-text-field {
      position: absolute;
      border: 2px #000;
      background-color: rgba(0, 255, 255, 0.2);
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
              confirmed: true
            }));
          }
          console.log(this.savedTextBoxes);

          this.requestUpdate();

          console.log(this.savedTextBoxes);

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

  async handleFileUpload(event: Event) {
    this.savedTextBoxes = [];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.pdfFile = input.files[0];
      const fileArrayBuffer = await this.pdfFile.arrayBuffer();
      this.pdfDoc = await PDFDocument.load(fileArrayBuffer);

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

      this.currentPageIndex = 0;
    }
  }

  navigateToPage(index: number) {
    if (index >= 0 && index < this.pdfPages.length) {
      this.currentPageIndex = index;
    }
  }

  handleTextFieldAdd() {
    if (!this.pdfFile || this.currentPageIndex < 0 || this.currentPageIndex >= this.pdfPages.length) return;

    this.textBoxes = [
      ...this.textBoxes,
      { x: this.textFieldX, y: this.textFieldY, width: this.textFieldWidth, height: this.textFieldHeight }
    ];

    this.isAddingTextField = true;
    this.requestUpdate();
  }

  async handleConfirmTextField() {
    if (!this.pdfFile || this.currentPageIndex < 0 || this.currentPageIndex >= this.pdfPages.length) return;

    const currentPageUrl = this.pageDataUrls[this.currentPageIndex];
    const existingPdfBytes = await fetch(currentPageUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pdfElement = this.shadowRoot?.querySelector('embed');
    const pdfRect = pdfElement?.getBoundingClientRect();
    const pdfWidth = pdfRect?.width || 1;
    this.pdfHeight = pdfRect?.height || 1;

    this.textBoxes.forEach((box, index) => {
      const page = pdfDoc.getPage(index);

      const scaleX = page.getWidth() / pdfWidth;
      const scaleY = page.getHeight() / this.pdfHeight;

      const id = `TextField${Date.now()}-${index}`;
      const text = '';
      this.savedTextBoxes.push({ page: this.currentPageIndex, textBox: { x: box.x, y: box.y, width: box.width, height: box.height, text: text, fieldId: id }, confirmed: true, scale: {x: scaleX, y: scaleY} });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const updatedDataUrl = URL.createObjectURL(blob);

    this.pageDataUrls[this.currentPageIndex] = updatedDataUrl;

    this.textBoxes = [];
    this.isAddingTextField = false;
    this.requestUpdate();
  }

  initializeDraggableTextField(textFieldElement: HTMLElement, index: number) {
    textFieldElement.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = true;
      this.initialDragX = e.clientX - this.textBoxes[index].x;
      this.initialDragY = e.clientY - this.textBoxes[index].y;

      const onMouseMove = (e: MouseEvent) => {
        if (this.isDragging) {
          this.textBoxes[index].x = e.clientX - this.initialDragX;
          this.textBoxes[index].y = e.clientY - this.initialDragY;
          this.requestUpdate();
        }
      };

      const onMouseUp = () => {
        this.isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  initializeResizableTextField(textFieldElement: HTMLElement, index: number) {
    const handleTopLeft = textFieldElement.querySelector('.handle.top-left') as HTMLElement;
    const handleTopRight = textFieldElement.querySelector('.handle.top-right') as HTMLElement;
    const handleBottomLeft = textFieldElement.querySelector('.handle.bottom-left') as HTMLElement;
    const handleBottomRight = textFieldElement.querySelector('.handle.bottom-right') as HTMLElement;

    const onMouseDown = (handle: string, e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      this.activeHandle = handle;
      this.initialMouseX = e.clientX;
      this.initialMouseY = e.clientY;
      this.initialTextFieldX = this.textBoxes[index].x;
      this.initialTextFieldY = this.textBoxes[index].y;
      this.initialTextFieldWidth = this.textBoxes[index].width;
      this.initialTextFieldHeight = this.textBoxes[index].height;

      const onMouseMove = (e: MouseEvent) => {
        if (!this.activeHandle) return;

        const deltaX = e.clientX - this.initialMouseX;
        const deltaY = e.clientY - this.initialMouseY;

        switch (this.activeHandle) {
          case 'top-left':
            this.textBoxes[index].x = this.initialTextFieldX + deltaX;
            this.textBoxes[index].y = this.initialTextFieldY + deltaY;
            this.textBoxes[index].width = this.initialTextFieldWidth - deltaX;
            this.textBoxes[index].height = this.initialTextFieldHeight - deltaY;
            break;
          case 'top-right':
            this.textBoxes[index].y = this.initialTextFieldY + deltaY;
            this.textBoxes[index].width = this.initialTextFieldWidth + deltaX;
            this.textBoxes[index].height = this.initialTextFieldHeight - deltaY;
            break;
          case 'bottom-left':
            this.textBoxes[index].x = this.initialTextFieldX + deltaX;
            this.textBoxes[index].width = this.initialTextFieldWidth - deltaX;
            this.textBoxes[index].height = this.initialTextFieldHeight + deltaY;
            break;
          case 'bottom-right':
            this.textBoxes[index].width = this.initialTextFieldWidth + deltaX;
            this.textBoxes[index].height = this.initialTextFieldHeight + deltaY;
            break;
        }

        this.requestUpdate();
      };

      const onMouseUp = () => {
        this.activeHandle = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    handleTopLeft.addEventListener('mousedown', onMouseDown.bind(null, 'top-left'));
    handleTopRight.addEventListener('mousedown', onMouseDown.bind(null, 'top-right'));
    handleBottomLeft.addEventListener('mousedown', onMouseDown.bind(null, 'bottom-left'));
    handleBottomRight.addEventListener('mousedown', onMouseDown.bind(null, 'bottom-right'));
  }

  async handleDownloadPdf() {
    if (this.pageDataUrls.length === 0) return;

    this.handleConfirmTextField();

    const fetchPromises = this.pageDataUrls.map(url => fetch(url).then(res => res.blob()));

    try {
      const pdfBlobs = await Promise.all(fetchPromises);
      const finalPdfDoc = await PDFDocument.create();

      for (const pdfBlob of pdfBlobs) {
        const pdfBytes = await pdfBlob.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const [page] = await finalPdfDoc.copyPages(pdf, [0]);
        finalPdfDoc.addPage(page);
      }

      const form = finalPdfDoc.getForm();
      for(let i=0; i < finalPdfDoc.getPageCount(); i++) {
        const page = finalPdfDoc.getPage(i);

        this.savedTextBoxes.forEach((iterator) => {
          if(iterator.page == i) {
          const pdfTextField = form.createTextField(iterator.textBox.fieldId);
          pdfTextField.setText(iterator.textBox.text);

          pdfTextField.addToPage(page, {
            x: iterator.textBox.x * iterator.scale.x,
            y: (this.pdfHeight - iterator.textBox.y - iterator.textBox.height)* iterator.scale.y,
            width: iterator.textBox.width * iterator.scale.x,
            height: iterator.textBox.height * iterator.scale.y,
            borderWidth: 0,
            textColor: rgb(0, 0, 0),
            backgroundColor: rgb(1, 1, 1),
            borderColor: rgb(0, 0, 0),
          });
        }
        })
      }

      const finalPdfBytes = await finalPdfDoc.save();
      const finalBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(finalBlob);
      downloadLink.download = 'modified_combined_pdf.pdf';
      downloadLink.click();

    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('textBoxes')) {
      this.updateComplete.then(() => {
        const textFields = this.shadowRoot?.querySelectorAll('.text-field');
        if (textFields) {
          textFields.forEach((textField, index) => {
            this.initializeDraggableTextField(textField as HTMLElement, index);
            this.initializeResizableTextField(textField as HTMLElement, index);
          });
        }
      }).catch(error => {
        console.error('Error updating component:', error);
      });
    }
  }


  handleDeleteTextField(index: number) {
    if (index >= 0 && index < this.textBoxes.length) {
      this.textBoxes.splice(index, 1);
      this.requestUpdate();
    }
  }

  async handleDeleteSavedTextField(fieldId: string) {
    const index = this.savedTextBoxes.findIndex(entry => entry.textBox.fieldId === fieldId);
    this.savedTextBoxes.splice(index, 1);
    this.requestUpdate();
  }

  async handleSaveInDatabase(event: Event) {
    event.preventDefault();

    this.handleConfirmTextField();

    try {
      if (!this.pdfDoc || this.pageDataUrls.length === 0) return;

      const currentPageUrl = this.pageDataUrls[this.currentPageIndex];
      const existingPdfBytes = await fetch(currentPageUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();
      if (!form) return;

      const fields = form.getFields();
      for (const field of fields) {
        form.removeField(field);
      }

      const fetchPromises = this.pageDataUrls.map(url => fetch(url).then(res => res.blob()));
      const pdfBlobs = await Promise.all(fetchPromises);
      const finalPdfDoc = await PDFDocument.create();

      for (const pdfBlob of pdfBlobs) {
        const pdfBytes = await pdfBlob.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const [page] = await finalPdfDoc.copyPages(pdf, [0]);
        finalPdfDoc.addPage(page);
      }

      const finalPdfBytes = await finalPdfDoc.save();

      const response = await fetch('/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pdfBytes: Array.from(finalPdfBytes),
          textBoxes: this.savedTextBoxes
        })
      });

      if (response.ok) {
        alert('Configuration saved successfully!');
        this.requestUpdate();
      } else {
        alert('Failed to save configuration');
      }
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  }


  render() {
    const pageDataUrl = this.pageDataUrls[this.currentPageIndex];

    return html`
      <app-header ?enableBack="${true}" .backPath="${'admin-home'}" .enableTitle="${false}"></app-header>

      <main>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-left:10%; padding-top:6px;">
          <div style="position: relative; flex: 1; margin-right: 5%;">
            <input id="fileInput" type="file" accept="application/pdf" @change="${this.handleFileUpload}" style="display: none;">
            <sl-button variant="primary" @click="${() => this.shadowRoot?.getElementById('fileInput')?.click()}">
              Încarcă pdf <sl-icon name="file-earmark-arrow-up-fill"></sl-icon>
            </sl-button>
          </div>
          ${this.pageDataUrls.length > 0 ? html`
            <div style="display: flex; align-items: center; gap: 10px; margin-right: 5%;">
              <sl-button variant="primary" @click="${() => this.navigateToPage(this.currentPageIndex - 1)}" ?disabled="${this.currentPageIndex === 0}"><sl-icon name="arrow-left-square-fill"></sl-icon></sl-button>
              <sl-button variant="primary" @click="${() => this.navigateToPage(this.currentPageIndex + 1)}" ?disabled="${this.currentPageIndex === this.pdfPages.length - 1}"><sl-icon name="arrow-right-square-fill"></sl-icon></sl-button>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; margin-right: 5%;">
              <sl-button variant="primary" @click="${this.handleTextFieldAdd}">Adaugă câmp <sl-icon name="plus-square-fill"></sl-icon></sl-button>
              <sl-button variant="primary" @click="${this.handleConfirmTextField}" class="confirm-button">Confirmă <sl-icon name="check-square-fill"></sl-icon></sl-button>
            </div>
            <div style="margin-right: 5%;">
              <sl-button variant="primary" @click="${this.handleSaveInDatabase}">Salvează configurația <sl-icon name="cloud-plus-fill"></sl-icon></sl-button>
            </div>
            <div style="margin-right: 5%;">
              <sl-button variant="primary" @click="${this.handleDownloadPdf}">Descarcă pdf <sl-icon name="file-earmark-arrow-down-fill"></sl-icon></sl-button>
            </div>
          ` : ''}
        </div>
        ${this.pageDataUrls.length > 0 ? html`
          <div style="display: flex; justify-content: center; position: relative;">
            <div style="position: relative;">
              <embed src="${pageDataUrl}#view=Fit&toolbar=0" type="application/pdf" style="width: ${600 * this.pdfPages[this.currentPageIndex].getWidth() / this.pdfPages[this.currentPageIndex].getHeight()}px; height: 600px;">
              ${this.savedTextBoxes
                .filter(entry => entry.page === this.currentPageIndex)
                .map((entry) => html`
                  <div class="${entry.confirmed ? 'confirmed-text-field' : 'text-field'}"  style="left: ${entry.textBox.x}px; top: ${entry.textBox.y}px; width: ${entry.textBox.width}px; height: ${entry.textBox.height}px;">
                    ${entry.textBox.text ? entry.textBox.text : ''}
                    <div class="delete-button-container">
                      <sl-button variant="danger" size="small" class="small-button" @click="${() => this.handleDeleteSavedTextField(entry.textBox.fieldId)}">
                        <sl-icon name="x-square-fill"></sl-icon>
                      </sl-button>
                    </div>
                  </div>
              `)}
              ${this.textBoxes.map((box, index) => html`
                <div class="text-field" style="left: ${box.x}px; top: ${box.y}px; width: ${box.width}px; height: ${box.height}px;">
                  <div class="handle top-left"></div>
                  <div class="handle top-right"></div>
                  <div class="handle bottom-left"></div>
                  <div class="handle bottom-right"></div>
                  <div class="delete-button-container">
                    <sl-button variant="danger" size="small" class="small-button" @click="${() => this.handleDeleteTextField(index)}">
                      <sl-icon name="x-square-fill"></sl-icon>
                    </sl-button>
                  </div>
                </div>
              `)}
            </div>
          </div>
        ` : ''}
      </main>
    `;
  }

}
