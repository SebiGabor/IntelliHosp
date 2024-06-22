import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../src/frontend/pages/admin-home';
import { AdminHome } from '../src/frontend/pages/admin-home';

describe('AdminHome Component', () => {
  let element: AdminHome;

  beforeEach(async () => {
    element = await fixture(html`<admin-home></admin-home>`);
  });

  test('should render the component', () => {
    expect(element).toBeInstanceOf(AdminHome);
  });

  test('should have two primary buttons', () => {
    const buttons = element.shadowRoot?.querySelectorAll('sl-button[variant="primary"]');
    expect(buttons?.length).toBe(2);
  });

  test('should have correct href attribute for personnel button', () => {
    const personnelButton = element.shadowRoot?.querySelector('sl-button[href*="admin-personnel"]');
    expect(personnelButton).toBeTruthy();
  });

  test('should have correct href attribute for care plan button', () => {
    const carePlanButton = element.shadowRoot?.querySelector('sl-button[href*="admin-care-plan"]');
    expect(carePlanButton).toBeTruthy();
  });

});
