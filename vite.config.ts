import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  base: "/",
  server: {
    port: 5173,
    proxy: {
      '/add-hospital': 'http://localhost:3000',
      '/admin-login': 'http://localhost:3000',
      '/get-personnel': 'http://localhost:3000',
    },
  },
  preview: {
    port: 5173,
    proxy: {
      '/add-hospital': 'http://localhost:3000',
      '/admin-login': 'http://localhost:3000',
      '/get-personnel': 'http://localhost:3000',
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
      strategies: "injectManifest",
      injectManifest: {
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{html,js,css,json, png}',
        ],
      },
      injectRegister: "auto",
      manifest: false,
      devOptions: {
        enabled: true
      }
    }),
    reactRefresh()
  ]
})
