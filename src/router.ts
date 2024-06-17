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
      title: 'Admin',
      plugins: [
        lazy(() => import('./pages/admin-home.js')),
      ],
      render: () => html`<admin-home></admin-home>`
    },
    {
      path: resolveRouterPath('admin-personnel'),
      title: 'Personal',
      plugins: [
        lazy(() => import('./pages/admin-personnel.js')),
      ],
      render: () => html`<admin-personnel></admin-personnel>`
    },
    {
      path: resolveRouterPath('admin-care-plan'),
      title: 'Plan de îngrijiri',
      plugins: [
        lazy(() => import('./pages/admin-care-plan.js')),
      ],
      render: () => html`<admin-care-plan></admin-care-plan>`
    },
    {
      path: resolveRouterPath('admin-add-personnel'),
      title: 'Adaugă personal',
      plugins: [
        lazy(() => import('./pages/admin-add-personnel.js')),
      ],
      render: () => html`<admin-add-personnel></admin-add-personnel>`
    },
    {
      path: resolveRouterPath('personnel-complete-plan'),
      title: 'Completează planul',
      plugins: [
        lazy(() => import('./pages/personnel-complete-plan.js')),
      ],
      render: () => html`<personnel-complete-plan></personnel-complete-plan>`
    },
  ]
}) ?? new Router();

export function resolveRouterPath(unresolvedPath?: string) {
  var resolvedPath = baseURL;
  if(unresolvedPath) {
    resolvedPath = resolvedPath + unresolvedPath;
  }
  else {
    localStorage.setItem('hospitalName', "IntelliHosp");
  }

  return resolvedPath;
}