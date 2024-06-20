import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { PDFDocument, rgb, PDFPage } from 'pdf-lib';

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
      this.pdfDoc = await PDFDocument.load(fileArrayBuffer);

      this.pdfPages = [];
      for (let i = 0; i < this.pdfDoc.getPageCount(); i++) {
        const [page] = await this.pdfDoc.copyPages(this.pdfDoc, [i]);
        this.pdfPages.push(page);
      }

      this.pageDataUrls = await Promise.all(this.pdfPages.map(async (page) => {
        if (this.pdfDoc) { // Check if pdfDoc is not null
          const newDocument = await PDFDocument.create();
          const copiedPage = await newDocument.copyPages(this.pdfDoc, [this.pdfPages.indexOf(page)]);
          newDocument.addPage(copiedPage[0]);
          const pdfBytes = await newDocument.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          return URL.createObjectURL(blob);
        }
        throw new Error("PDF document is not loaded.");
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

    // Load the existing PDFDocument from the current page's URL
    const currentPageUrl = this.pageDataUrls[this.currentPageIndex];
    const existingPdfBytes = await fetch(currentPageUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const form = pdfDoc.getForm();
    const page = pdfDoc.getPage(0); // Get the first page of the new document

    // Calculate the scaling factor between the HTML embed and the actual PDF dimensions
    const pdfElement = this.shadowRoot?.querySelector('embed');
    const pdfRect = pdfElement?.getBoundingClientRect();
    const pdfWidth = pdfRect?.width || 1;
    const pdfHeight = pdfRect?.height || 1;

    const scaleX = page.getWidth() / pdfWidth;
    const scaleY = page.getHeight() / pdfHeight;

    // Create PDFTextField for each text box
    this.textBoxes.forEach((box, index) => {
      const pdfTextField = form.createTextField(`TextField${Date.now()}-${index}`);
      pdfTextField.setText('Sample text');
      pdfTextField.addToPage(page, {
        x: box.x * scaleX,
        y: (pdfHeight - box.y - box.height) * scaleY,
        width: box.width * scaleX,
        height: box.height * scaleY,
        textColor: rgb(0, 0, 0),
        backgroundColor: rgb(1, 1, 1),
        borderColor: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const updatedDataUrl = URL.createObjectURL(blob);

    this.pageDataUrls[this.currentPageIndex] = updatedDataUrl;

    // Clear text boxes
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

        const finalPdfBytes = await finalPdfDoc.save();
        const finalBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(finalBlob);
        downloadLink.download = 'modified_combined_pdf.pdf';
        downloadLink.click();

    } catch (error) {
        console.error('Error downloading PDF:', error);
        // Handle error appropriately
    }
}

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('textBoxes')) {
      const textFields = this.shadowRoot?.querySelectorAll('.text-field');
      if (textFields) {
        textFields.forEach((textField, index) => {
          this.initializeDraggableTextField(textField as HTMLElement, index);
          this.initializeResizableTextField(textField as HTMLElement, index);
        });
      }
    }
  }

  handleDeleteTextField(index: number) {
    if (index >= 0 && index < this.textBoxes.length) {
      this.textBoxes.splice(index, 1); // Remove the text field at the specified index
      this.requestUpdate(); // Trigger LitElement to re-render
    }
  }

  render() {
    const pageDataUrl = this.pageDataUrls[this.currentPageIndex];

    return html`
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
          <input type="file" accept="application/pdf" @change="${this.handleFileUpload}" />
          ${this.pageDataUrls.length > 0 ? html`
            <div style="display: flex; align-items: center; gap: 10px;">
              <button @click="${() => this.navigateToPage(this.currentPageIndex - 1)}" ?disabled="${this.currentPageIndex === 0}">Previous Page</button>
              <button @click="${() => this.navigateToPage(this.currentPageIndex + 1)}" ?disabled="${this.currentPageIndex === this.pdfPages.length - 1}">Next Page</button>
              <button @click="${this.handleTextFieldAdd}">Add Text Field</button>
              <button @click="${this.handleConfirmTextField}" class="confirm-button">Confirm</button>
              <button @click="${this.handleDownloadPdf}">Download PDF with Text Field</button>
            </div>
          ` : ''}
        </div>
        ${this.pageDataUrls.length > 0 ? html`
          <div style="display: flex; justify-content: center; position: relative;">
            <div style="position: relative;">
              <embed src="${pageDataUrl}#view=Fit&toolbar=0" type="application/pdf" style="width: ${600 * this.pdfPages[this.currentPageIndex].getWidth() / this.pdfPages[this.currentPageIndex].getHeight()}px; height: 600px;">
              ${this.textBoxes.map((box, index) => html`
                <div class="text-field" style="left: ${box.x}px; top: ${box.y}px; width: ${box.width}px; height: ${box.height}px;">
                  Sample text field
                  <div class="handle top-left"></div>
                  <div class="handle top-right"></div>
                  <div class="handle bottom-left"></div>
                  <div class="handle bottom-right"></div>
                  <button @click="${() => this.handleDeleteTextField(index)}">Delete</button>
                </div>
              `)}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}
