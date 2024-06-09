import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

import './pages/app-home.js';

const baseURL: string = (import.meta as any).env.BASE_URL || '';

export const router = new Router({
  routes: [
    {
      path: resolveRouterPath(),
      title: 'Acasă',
      render: () => html`<app-home></app-home>`
    },
    {
      path: resolveRouterPath('about'),
      title: 'Despre',
      plugins: [
        lazy(() => import('./pages/app-about.js')),
      ],
      render: () => html`<app-about></app-about>`
    },
    {
      path: resolveRouterPath('registerHospital'),
      title: 'Înregistrare spital',
      plugins: [
        lazy(() => import('./pages/register-hospital.js')),
      ],
      render: () => html`<register-hospital></register-hospital>`
    },
    {
      path: resolveRouterPath('hospRegisterSuccess'),
      title: 'Spital înregistrat cu succes',
      plugins: [
        lazy(() => import('./pages/hosp-register-success.js')),
      ],
      render: () => html`<hosp-register-success></hosp-register-success>`
    },
    {
      path: resolveRouterPath('admin-home'),
      title: 'Admin Home',
      plugins: [
        lazy(() => import('./pages/admin-home.js')),
      ],
      render: () => html`<admin-home></admin-home>`
    }
  ]
}) ?? new Router();

export function resolveRouterPath(unresolvedPath?: string) {
  var resolvedPath = baseURL;
  if(unresolvedPath) {
    resolvedPath = resolvedPath + unresolvedPath;
  }

  return resolvedPath;
}