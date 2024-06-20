import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

@customElement('admin-care-plan')
export class AdminCarePlan extends LitElement {
  @state() pdfFile: File | null = null;
  @state() pdfPages: PDFPage[] = [];
  @state() currentPageIndex: number = 0;
  @state() pageDataUrls: string[] = [];
  @state() isAddingTextField: boolean = false;
  @state() textFieldX: number = 50;
  @state() textFieldY: number = 50;
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

  async handleTextFieldAdd() {
    if (!this.pdfFile || this.currentPageIndex < 0 || this.currentPageIndex >= this.pdfPages.length) return;

    const currentPage = this.pdfPages[this.currentPageIndex];
    const pdfDoc = currentPage.doc;

    const newDocument = await PDFDocument.create();
    const copiedPage = await newDocument.copyPages(pdfDoc, [this.currentPageIndex]);
    newDocument.addPage(copiedPage[0]);

    const form = newDocument.getForm();

    const textField = form.createTextField('TextField1');
    textField.setText('Sample text');
    textField.addToPage(copiedPage[0], {
      x: this.textFieldX,
      y: this.textFieldY,
      width: this.textFieldWidth,
      height: this.textFieldHeight,
      textColor: rgb(0, 0, 0),
      backgroundColor: rgb(1, 1, 1),
      borderColor: rgb(0, 0, 0)
    });

    const pdfBytes = await newDocument.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const updatedDataUrl = URL.createObjectURL(blob);

    this.pageDataUrls[this.currentPageIndex] = updatedDataUrl;

    // Enable text field editing
    this.isAddingTextField = true;
    this.requestUpdate();
  }

  initializeDraggableTextField(textFieldElement: HTMLElement) {
    textFieldElement.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = true;
      this.initialDragX = e.clientX - this.textFieldX;
      this.initialDragY = e.clientY - this.textFieldY;
    });

    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.textFieldX = e.clientX - this.initialDragX;
        this.textFieldY = e.clientY - this.initialDragY;
      }
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  initializeResizableTextField(textFieldElement: HTMLElement) {
    const handleTopLeft = document.createElement('div');
    handleTopLeft.className = 'handle top-left';
    textFieldElement.appendChild(handleTopLeft);

    const handleTopRight = document.createElement('div');
    handleTopRight.className = 'handle top-right';
    textFieldElement.appendChild(handleTopRight);

    const handleBottomLeft = document.createElement('div');
    handleBottomLeft.className = 'handle bottom-left';
    textFieldElement.appendChild(handleBottomLeft);

    const handleBottomRight = document.createElement('div');
    handleBottomRight.className = 'handle bottom-right';
    textFieldElement.appendChild(handleBottomRight);

    const onMouseDown = (handle: string, e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      this.activeHandle = handle;
      this.initialMouseX = e.clientX;
      this.initialMouseY = e.clientY;
      this.initialTextFieldX = this.textFieldX;
      this.initialTextFieldY = this.textFieldY;
      this.initialTextFieldWidth = this.textFieldWidth;
      this.initialTextFieldHeight = this.textFieldHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!this.activeHandle) return;

      const deltaX = e.clientX - this.initialMouseX;
      const deltaY = e.clientY - this.initialMouseY;

      switch (this.activeHandle) {
        case 'top-left':
          this.textFieldX = this.initialTextFieldX + deltaX;
          this.textFieldY = this.initialTextFieldY + deltaY;
          this.textFieldWidth = this.initialTextFieldWidth - deltaX;
          this.textFieldHeight = this.initialTextFieldHeight - deltaY;
          break;
        case 'top-right':
          this.textFieldY = this.initialTextFieldY + deltaY;
          this.textFieldWidth = this.initialTextFieldWidth + deltaX;
          this.textFieldHeight = this.initialTextFieldHeight - deltaY;
          break;
        case 'bottom-left':
          this.textFieldX = this.initialTextFieldX + deltaX;
          this.textFieldWidth = this.initialTextFieldWidth - deltaX;
          this.textFieldHeight = this.initialTextFieldHeight + deltaY;
          break;
        case 'bottom-right':
          this.textFieldWidth = this.initialTextFieldWidth + deltaX;
          this.textFieldHeight = this.initialTextFieldHeight + deltaY;
          break;
      }
    };

    const onMouseUp = () => {
      this.activeHandle = null;
    };

    handleTopLeft.addEventListener('mousedown', onMouseDown.bind(null, 'top-left'));
    handleTopRight.addEventListener('mousedown', onMouseDown.bind(null, 'top-right'));
    handleBottomLeft.addEventListener('mousedown', onMouseDown.bind(null, 'bottom-left'));
    handleBottomRight.addEventListener('mousedown', onMouseDown.bind(null, 'bottom-right'));

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  async handleDownloadPdf() {
    if (this.pageDataUrls.length === 0) return;

    const pdfBytes = await fetch(this.pageDataUrls[this.currentPageIndex]).then((res) => res.blob());

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBytes);
    downloadLink.download = 'modified_pdf_with_text_field.pdf';
    downloadLink.click();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('isAddingTextField') && this.isAddingTextField) {
      const textField = this.shadowRoot?.querySelector('.text-field') as HTMLElement;
      if (textField) {
        this.initializeDraggableTextField(textField);
        this.initializeResizableTextField(textField);
      }
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
              ${this.isAddingTextField ? html`
                <div class="text-field" style="left: ${this.textFieldX}px; top: ${this.textFieldY}px; width: ${this.textFieldWidth}px; height: ${this.textFieldHeight}px;">
                  Sample text field
                  <div class="handle top-left"></div>
                  <div class="handle top-right"></div>
                  <div class="handle bottom-left"></div>
                  <div class="handle bottom-right"></div>
                </div>
              ` : ''}
              <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);">
                <button @click="${() => this.navigateToPage(this.currentPageIndex - 1)}" ?disabled="${this.currentPageIndex === 0}">Previous Page</button>
                <button @click="${() => this.navigateToPage(this.currentPageIndex + 1)}" ?disabled="${this.currentPageIndex === this.pdfPages.length - 1}">Next Page</button>
                <button @click="${this.handleTextFieldAdd}">Add Text Field</button>
                <button @click="${this.handleDownloadPdf}">Download PDF with Text Field</button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}
