import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: "/",
  server: {
    proxy: {
      '/add-hospital': 'http://localhost:3000',
      '/admin-login': 'http://localhost:3000',
    },
  },
  build: {
    sourcemap: true,
    assetsDir: "code",
    target: ["esnext", "edge100", "firefox100", "chrome100", "safari18"],
  },
  plugins: [
    VitePWA({
      strategies: "injectManifest",
      injectManifest: {
        globDirectory: 'dist',
        globPatterns: [
          '**/*.{html,js,css,json, png}',
        ],
      },
      injectRegister: false,
      manifest: false,
      devOptions: {
        enabled: true
      }
    })
  ]
})
