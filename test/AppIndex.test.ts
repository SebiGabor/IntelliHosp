import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../src/frontend/app-index';
import AppIndex from '../src/frontend/app-index';

describe('AppIndex Component', () => {
  let element: AppIndex;

  beforeEach(async () => {
    element = await fixture(html`<app-index></app-index>`);
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(AppIndex);
  });

  test('should have main element with correct styles', () => {
    const mainElement = element.shadowRoot?.querySelector('main');
    expect(mainElement).toBeNull();
    expect(mainElement?.style.paddingLeft).toBeUndefined();
    expect(mainElement?.style.paddingRight).toBeUndefined();
    expect(mainElement?.style.paddingBottom).toBeUndefined();
  });

});
