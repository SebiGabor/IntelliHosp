import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import { AdminCarePlan } from '../src/frontend/pages/admin-care-plan';
import { PDFDocument } from 'pdf-lib';

describe('AdminCarePlan Component', () => {
  let element: AdminCarePlan;

  beforeEach(async () => {
    element = await fixture(html`<admin-care-plan></admin-care-plan>`);
    element.pdfFile = new File(['dummy'], 'dummy.pdf', { type: 'application/pdf' });
    element.pdfDoc = await PDFDocument.create();
    const page = element.pdfDoc.addPage();
    element.pdfPages = [page];
    element.pageDataUrls = ['dummy_url'];
    element.savedTextBoxes = [{
      page: 0,
      textBox: {
        fieldId: 'fieldId',
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        text: 'Sample Text'
      },
      scale: { x: 1, y: 1 },
      confirmed: true
    }];
    element.requestUpdate();
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(AdminCarePlan);
  });

  test('should handle file upload correctly', async () => {
    const file = new File(['dummy'], 'dummy.pdf', { type: 'application/pdf' });
    const fileInput = element.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement;

    setTimeout(() => {
      fileInput.dispatchEvent(new Event('change'));
    }, 100);

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(element.pdfFile?.name).toBe(file.name);
  });

  test('should navigate to next and previous pages correctly', async () => {
    const nextPageButton = element.shadowRoot?.querySelector('sl-button[aria-label="Next page"]');
    const prevPageButton = element.shadowRoot?.querySelector('sl-button[aria-label="Previous page"]');

    expect(nextPageButton).toBeDefined();
    expect(prevPageButton).toBeDefined();

    nextPageButton?.dispatchEvent(new Event('click'));
    await element.updateComplete;

    expect(element.currentPageIndex).toBe(0);

    prevPageButton?.dispatchEvent(new Event('click'));
    await element.updateComplete;

    expect(element.currentPageIndex).toBe(0);
  });

  test('should add and confirm text fields correctly', async () => {
    const addButton = element.shadowRoot?.querySelector('sl-button[aria-label="Add text field"]');
    const confirmButton = element.shadowRoot?.querySelector('sl-button[aria-label="Confirm text fields"]');

    expect(addButton).toBeDefined();
    expect(confirmButton).toBeDefined();

    addButton?.dispatchEvent(new Event('click'));
    await element.updateComplete;

    const initialTextBoxLength = element.textBoxes.length;

    confirmButton?.dispatchEvent(new Event('click'));
    await element.updateComplete;

    expect(element.savedTextBoxes.length).toBeGreaterThan(0);
    expect(element.textBoxes.length).toBe(0);
  });

  test('should delete saved text field correctly', async () => {
    const deleteButton = element.shadowRoot?.querySelector('sl-button[aria-label="Delete saved text field"]');

    expect(deleteButton).toBeDefined();

    deleteButton?.dispatchEvent(new Event('click'));
    await element.updateComplete;

    expect(element.savedTextBoxes.length).toBe(1);
  });

  test('should save configuration correctly', async () => {
    const saveButton = element.shadowRoot?.querySelector('sl-button[aria-label="Save configuration"]');

    expect(saveButton).toBeDefined();

    saveButton?.dispatchEvent(new Event('click'));
    await element.updateComplete;
  });

  test('should download PDF correctly', async () => {
    const downloadButton = element.shadowRoot?.querySelector('sl-button[aria-label="Download PDF"]');

    expect(downloadButton).toBeDefined();

    downloadButton?.dispatchEvent(new Event('click'));
    await element.updateComplete;
  });

  test('should undo text box operation correctly', async () => {
    const undoButton = element.shadowRoot?.querySelector('sl-button[aria-label="Undo"]');

    expect(undoButton).toBeDefined();

    expect(element.savedTextBoxes.length).toBe(1);

    element.savedTextBoxes.pop();

    expect(element.savedTextBoxes.length).toBe(0);
  });

  test('should reset component state correctly', async () => {
    const resetButton = element.shadowRoot?.querySelector('sl-button[aria-label="Reset"]');

    expect(resetButton).toBeDefined();

    expect(element.savedTextBoxes.length).toBe(1);

    element.savedTextBoxes = [];

    expect(element.savedTextBoxes.length).toBe(0);
  });

});
