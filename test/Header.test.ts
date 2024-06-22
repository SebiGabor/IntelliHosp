import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../src/frontend/components/header';
import { AppHeader } from '../src/frontend/components/header';

describe('AppHeader Component', () => {
  let element: AppHeader;

  beforeEach(async () => {
    element = await fixture(html`<app-header></app-header>`);
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(AppHeader);
  });

  test('should render title correctly', () => {
    element.title = 'Test Hospital';
    const titleElement = element.shadowRoot?.querySelector('h1');
    expect(titleElement?.textContent).toContain('IntelliHosp');
  });

  test('should render back button when enabled', async () => {
    element.enableBack = true;
    element.backPath = 'some-path';
    await element.updateComplete;

    const backButton = element.shadowRoot?.querySelector('sl-button');
    expect(backButton?.textContent?.trim()).toBe('Înapoi');
    expect(backButton?.getAttribute('href')).toContain('some-path');
  });

  test('should render logout button when enabled', async () => {
    element.enableLogOut = true;
    await element.updateComplete;

    const logoutButton = element.shadowRoot?.querySelector('sl-button');
    expect(logoutButton?.textContent?.trim()).toBe('Delogare');
  });

  test('should call logout method when logout button is clicked', async () => {
    element.enableLogOut = true;
    await element.updateComplete;

    const logoutButton = element.shadowRoot?.querySelector('sl-button');
    logoutButton?.dispatchEvent(new MouseEvent('click'));
  });
});
