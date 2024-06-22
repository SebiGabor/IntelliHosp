import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  base: "/",
  server: {
    open: true,
    port: 5173,
    proxy: {
      '/add-hospital': 'http://localhost:3000',
      '/admin-login': 'http://localhost:3000',
      '/get-personnel': 'http://localhost:3000',
      '/admin-add-personnel': 'http://localhost:3000',
      '/save-config': 'http://localhost:3000',
      '/fetch-config': 'http://localhost:3000',
      '/personnel-login': 'http://localhost:3000',
      '/personnel-add-patient': 'http://localhost:3000',
      '/get-patients': 'http://localhost:3000',
      '/update-patient-plan': 'http://localhost:3000',
      '/fetch-patient-plan': 'http://localhost:3000',
    },
  },
  preview: {
    port: 5173,
    proxy: {
      '/add-hospital': 'http://localhost:3000',
      '/admin-login': 'http://localhost:3000',
      '/get-personnel': 'http://localhost:3000',
      '/admin-add-personnel': 'http://localhost:3000',
      '/save-config': 'http://localhost:3000',
      '/fetch-config': 'http://localhost:3000',
      '/personnel-login': 'http://localhost:3000',
      '/personnel-add-patient': 'http://localhost:3000',
      '/get-patients': 'http://localhost:3000',
      '/update-patient-plan': 'http://localhost:3000',
      '/fetch-patient-plan': 'http://localhost:3000',
    },
  },
  build: {
    manifest: true,
    sourcemap: true,
    assetsDir: "code",
    target: ["esnext", "edge100", "firefox100", "chrome100", "safari18"],
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        sourcemap: false,
        runtimeCaching: [
          {
            urlPattern: new RegExp('^http://localhost:3000/'),
            handler: 'StaleWhileRevalidate',
          },
        ],
      },
      injectRegister: 'auto',
    }),
    reactRefresh(),
  ],
});
