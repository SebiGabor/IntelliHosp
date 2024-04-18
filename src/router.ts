import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

import './pages/app-home.js';

const baseURL: string = (import.meta as any).env.BASE_URL || '';

export const router = new Router({
  routes: [
    {
      path: resolveRouterPath(),
      title: 'Home',
      render: () => html`<app-home></app-home>`
    },
    {
      path: resolveRouterPath('about'),
      title: 'About',
      plugins: [
        lazy(() => import('./pages/app-about/app-about.js')),
      ],
      render: () => html`<app-about></app-about>`
    },
    {
      path: resolveRouterPath('registerHospital'),
      title: 'Register Hospital',
      plugins: [
        lazy(() => import('./pages/register-hospital.js')),
      ],
      render: () => html`<register-hospital></register-hospital>`
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