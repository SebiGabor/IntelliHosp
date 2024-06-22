import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../src/frontend/pages/hosp-register-success';
import { HospRegSuccess } from '../src/frontend/pages/hosp-register-success';

describe('HospRegSuccess Component', () => {
  let element: HospRegSuccess;

  beforeEach(async () => {
    element = await fixture(html`<hosp-register-success></hosp-register-success>`);
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(HospRegSuccess);
  });

  test('should have a success message', () => {
    const successMessage = element.shadowRoot?.querySelector('h2');
    expect(successMessage?.textContent).toContain('Success');
  });

  test('should display registration success message in sl-card', () => {
    const cardMessage = element.shadowRoot?.querySelector('sl-card > h2');
    expect(cardMessage?.textContent).toContain('Spitalul a fost înregistrat cu succes!');
  });

  test('should contain email verification instructions', () => {
    const paragraphs = element.shadowRoot?.querySelectorAll('sl-card > p');
    expect(paragraphs).toBeTruthy();
    expect(paragraphs?.length).toBe(3);
    expect(paragraphs?.[0].textContent).toContain('Verificați adresa de email');
    expect(paragraphs?.[1].textContent).toContain('În caz că nu apare mailul');
  });

  test('should have a back button in app-header', () => {
    const appHeader = element.shadowRoot?.querySelector('app-header');
    expect(appHeader?.getAttribute('enableBack')).toBe('');
  });

  test('should apply specific styles to sl-card', () => {
    const slCard = element.shadowRoot?.querySelector('sl-card');
    expect(slCard).toBeTruthy();
    const slCardStyles = window.getComputedStyle(slCard as Element);
    expect(slCardStyles.getPropertyValue('max-width')).toBe('');
  });
});
