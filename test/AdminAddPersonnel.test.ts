import { expect, test, describe, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../src/frontend/pages/admin-add-personnel';
import { AdminAddPersonnel } from '../src/frontend/pages/admin-add-personnel';

describe('AdminAddPersonnel Component', () => {
  let element: AdminAddPersonnel;

  beforeEach(async () => {
    element = await fixture(html`<admin-add-personnel></admin-add-personnel>`);
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(AdminAddPersonnel);
  });

  test('should have default message "Adaugă personal spital"', () => {
    const h2 = element.shadowRoot?.querySelector('h2');
    expect(h2?.textContent).toBe('Adaugă personal spital');
  });

  test('should update input properties on input', async () => {
    const calificareInput = element.shadowRoot?.querySelector('sl-input[name="calificare"]') as HTMLInputElement;
    const prenumeInput = element.shadowRoot?.querySelector('sl-input[name="prenume"]') as HTMLInputElement;
    const numeInput = element.shadowRoot?.querySelector('sl-input[name="nume"]') as HTMLInputElement;
    const emailInput = element.shadowRoot?.querySelector('sl-input[name="email"]') as HTMLInputElement;

    calificareInput.value = 'Doctor';
    calificareInput.dispatchEvent(new CustomEvent('sl-input', { detail: { value: 'Doctor' } }));

    prenumeInput.value = 'John';
    prenumeInput.dispatchEvent(new CustomEvent('sl-input', { detail: { value: 'John' } }));

    numeInput.value = 'Doe';
    numeInput.dispatchEvent(new CustomEvent('sl-input', { detail: { value: 'Doe' } }));

    emailInput.value = 'john.doe@example.com';
    emailInput.dispatchEvent(new CustomEvent('sl-input', { detail: { value: 'john.doe@example.com' } }));

    expect(calificareInput.value).toBe('Doctor');
    expect(prenumeInput.value).toBe('John');
    expect(numeInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
  });

});
