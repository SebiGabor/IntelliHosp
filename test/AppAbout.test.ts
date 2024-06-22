import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html, nextFrame } from '@open-wc/testing-helpers';
import '../src/frontend/pages/app-about';
import { AppAbout } from '../src/frontend/pages/app-about';

describe('AppAbout Component', () => {
  let element: AppAbout;

  beforeEach(async () => {
    element = await fixture(html`<app-about></app-about>`);
    await nextFrame();
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(AppAbout);
  });

  test('should have a header element', () => {
    const header = element.shadowRoot?.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  test('should render the about section', () => {
    const aboutSection = element.shadowRoot?.querySelector('main h2');
    expect(aboutSection?.textContent).toContain('Despre');
  });

  test('should render the card with application information', () => {
    const cardTitle = element.shadowRoot?.querySelector('sl-card h2');
    const cardContent = element.shadowRoot?.querySelector('sl-card p');

    expect(cardTitle?.textContent).toContain('Despre aplicație');
    expect(cardContent?.textContent).toContain('IntelliHosp este un proiect');
  });

  test('should have correct styles applied to the main element', () => {
    const mainElement = element.shadowRoot?.querySelector('main');
    const mainStyles = getComputedStyle(mainElement as Element);

    expect(mainStyles.display).toBe('block');
    expect(mainStyles.flexDirection).toBe('');
    expect(mainStyles.alignItems).toBe('');
    expect(mainStyles.padding).toBe('');
  });

  test('should have correct styles applied to sl-card', () => {
    const slCardElement = element.shadowRoot?.querySelector('sl-card');
    const slCardStyles = getComputedStyle(slCardElement as Element);

    expect(slCardStyles.width).toBe('');
    expect(slCardStyles.maxWidth).toBe('');
  });

});
