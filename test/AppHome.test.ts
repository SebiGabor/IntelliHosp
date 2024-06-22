import { expect, test, describe, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import '../src/frontend/pages/app-home';
import { AppHome } from '../src/frontend/pages/app-home';

describe('AppHome Component', () => {
    let element: AppHome;

    beforeEach(async () => {
      element = await fixture(html`<app-home></app-home>`);
    });

    test('should render the component', () => {
      expect(element).toBeInstanceOf(AppHome);
    });

    test('should have default message "Logare IntelliHosp"', () => {
      const h2 = element.shadowRoot?.querySelector('h2');
      expect(h2?.textContent).toBe('Logare IntelliHosp');
    });

    test('should update username and password properties on input', async () => {
      const usernameInput = element.shadowRoot?.querySelector('sl-input[name="username"]') as HTMLInputElement;
      const passwordInput = element.shadowRoot?.querySelector('sl-input[name="password"]') as HTMLInputElement;

      usernameInput.value = 'testuser';
      usernameInput.dispatchEvent(new CustomEvent('sl-input', { detail: { value: 'testuser' } }));

      passwordInput.value = 'testpass';
      passwordInput.dispatchEvent(new CustomEvent('sl-input', { detail: { value: 'testpass' } }));

      element.username = 'testuser';
      element.password = 'testpass';

      expect(element.username).toBe('testuser');
      expect(element.password).toBe('testpass');
    });

    test('should handle login correctly', async () => {
      const loginResponse = {
        ok: true,
        json: async () => ({ hospitalName: 'IntelliHosp' })
      };
      global.fetch = vi.fn().mockResolvedValue(loginResponse as Response);

      element.username = 'testuser';
      element.password = 'testpass';

      await element.login(new Event('submit'));

      expect(localStorage.getItem('hospitalName')).toBe('IntelliHosp');
      expect(global.fetch).toHaveBeenCalledWith('/personnel-login', expect.any(Object));
    });

    test('should handle login error', async () => {
      const loginResponse = {
        ok: false,
        json: async () => ({ error: 'Incorrect password' })
      };
      global.fetch = vi.fn().mockResolvedValue(loginResponse as Response);

      element.username = 'testuser';
      element.password = 'wrongpass';

      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      await element.login(new Event('submit'));

      expect(alertSpy).toHaveBeenCalledWith('Eroare la login: Niciun răspuns de la server!');
    });
  });