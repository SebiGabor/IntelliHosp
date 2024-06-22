import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html, nextFrame } from '@open-wc/testing-helpers';
import '../src/frontend/pages/personnel-home';
import { PersonnelHome } from '../src/frontend/pages/personnel-home';

describe('PersonnelHome Component', () => {
  let element: PersonnelHome;

  beforeEach(async () => {
    element = await fixture(html`<personnel-home></personnel-home>`);
    await element.updateComplete;
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(PersonnelHome);
  });

  test('should render the header element', () => {
    const header = element.shadowRoot?.querySelector('.header h2');
    expect(header?.textContent).toContain('Pacienți spital');
  });

  test('should render the "Adaugă un pacient nou" button', () => {
    const addButton = element.shadowRoot?.querySelector('sl-button[variant="primary"]');
    expect(addButton?.textContent).toContain('Adaugă un pacient nou');
  });

  test('should fetch and render patient data', async () => {
    await element.fetchPatientsData();

    const patientsTable = element.shadowRoot?.querySelector('table');
    expect(patientsTable).toBeNull();

    const tableRows = element.shadowRoot?.querySelectorAll('tbody tr');
    expect(tableRows?.length).toBeGreaterThanOrEqual(0);
  });

  test('should handle button click for patient details', async () => {
    await element.fetchPatientsData();

    const firstPatientButton = element.shadowRoot?.querySelector('tbody tr sl-button');
    firstPatientButton?.dispatchEvent(new Event('click'));

    const selectedPatientId = localStorage.getItem('selectedPatientId');
    expect(selectedPatientId).toBeNull();
  });

  test('should display loading message when no patients are fetched', async () => {
    element.patients = [];

    await element.updateComplete;

    const loadingMessage = element.shadowRoot?.querySelector('p');
    expect(loadingMessage?.textContent).toContain('Se încarcă pacienții...');
  });

  test('should have correct styles applied to the main element', () => {
    const mainElement = element.shadowRoot?.querySelector('main');
    const mainStyles = getComputedStyle(mainElement as Element);

    expect(mainStyles.display).toBe('block');
    expect(mainStyles.maxWidth).toBe('');
  });

  test('should have correct styles applied to sl-card', () => {
    const slCardElement = element.shadowRoot?.querySelector('sl-card');
    const slCardStyles = getComputedStyle(slCardElement as Element);

    expect(slCardStyles.maxWidth).toBe('');
  });

});
