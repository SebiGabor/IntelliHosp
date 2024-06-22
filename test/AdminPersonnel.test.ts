import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../src/frontend/pages/admin-personnel';
import { AdminPersonnel } from '../src/frontend/pages/admin-personnel';

describe('AdminPersonnel Component', () => {
  let element: AdminPersonnel;

  beforeEach(async () => {
    element = await fixture(html`<admin-personnel></admin-personnel>`);
    element.fetchPersonnelData = async () => {
      element.personnel = [
        { Calificare: 'Doctor', Nume: 'Doe', Prenume: 'John', Email: 'john.doe@example.com' },
        { Calificare: 'Nurse', Nume: 'Smith', Prenume: 'Jane', Email: 'jane.smith@example.com' }
      ];
    };
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(AdminPersonnel);
  });

  test('should render personnel data in table when data is fetched', async () => {
    await element.fetchPersonnelData();
    element.requestUpdate();

    const tableRows = element.shadowRoot?.querySelectorAll('tbody tr');
    expect(tableRows?.length).toBe(element.personnel.length);
  });

  test('should render loading message when personnel data is empty', async () => {
    element.personnel = [];
    element.requestUpdate();

    const loadingMessage = element.shadowRoot?.querySelector('p');
    expect(loadingMessage?.textContent).toBe('Se încarcă personalul...');
  });

  test('should have a link to add new personnel', () => {
    const addButton = element.shadowRoot?.querySelector('sl-button[variant="primary"]');
    expect(addButton).toBeTruthy();
    expect(addButton?.getAttribute('href')).toContain('admin-add-personnel');
  });

});
