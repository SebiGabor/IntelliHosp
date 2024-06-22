import { expect, test, describe, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';

import '../src/frontend/pages/app-home.js';
import '../src/frontend/pages/app-about.js';
import '../src/frontend/pages/register-hospital.js';
import '../src/frontend/pages/hosp-register-success.js';
import '../src/frontend/pages/admin-home.js';
import '../src/frontend/pages/admin-personnel.js';
import '../src/frontend/pages/admin-care-plan.js';
import '../src/frontend/pages/admin-add-personnel.js';
import '../src/frontend/pages/personnel-complete-plan.js';
import '../src/frontend/pages/personnel-home.js';
import '../src/frontend/pages/personnel-add-patient.js';

import { router, resolveRouterPath } from '../src/frontend/router.js';

describe('Router Configuration', () => {
  let routerInstance: any;

  beforeEach(() => {
    routerInstance = router;
  });

  test('Router instance should be defined', () => {
    expect(routerInstance).toBeDefined();
  });

  test('Router should have correct number of routes', () => {
    const routes = routerInstance.routes;
    expect(routes).toHaveLength(11);
  });

  test('Router resolveRouterPath function should return correct path', () => {
    const resolvedPath = resolveRouterPath('about');
    expect(resolvedPath).toBe('/about');
  });

});


describe('AppHome Component', () => {
  let appHomeElement: any;

  beforeEach(async () => {
    appHomeElement = await fixture(html`<app-home></app-home>`);
  });

  test('AppHome component should render correctly', () => {
    expect(appHomeElement).toBeDefined();
  });
});
