// vite.config.ts
import { defineConfig } from "file:///C:/Work/IntelliHosp/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Work/IntelliHosp/node_modules/vite-plugin-pwa/dist/index.mjs";
import reactRefresh from "file:///C:/Work/IntelliHosp/node_modules/@vitejs/plugin-react-refresh/index.js";
var vite_config_default = defineConfig({
  base: "/",
  server: {
    open: true,
    port: 5173,
    proxy: {
      "/add-hospital": "http://localhost:3000",
      "/admin-login": "http://localhost:3000",
      "/get-personnel": "http://localhost:3000",
      "/admin-add-personnel": "http://localhost:3000",
      "/save-config": "http://localhost:3000",
      "/fetch-config": "http://localhost:3000",
      "/personnel-login": "http://localhost:3000",
      "/personnel-add-patient": "http://localhost:3000",
      "/get-patients": "http://localhost:3000",
      "/update-patient-plan": "http://localhost:3000",
      "/fetch-patient-plan": "http://localhost:3000",
      "/send-email-plan": 'http://localhost:3000',
    }
  },
  preview: {
    port: 5173,
    proxy: {
      "/add-hospital": "http://localhost:3000",
      "/admin-login": "http://localhost:3000",
      "/get-personnel": "http://localhost:3000",
      "/admin-add-personnel": "http://localhost:3000",
      "/save-config": "http://localhost:3000",
      "/fetch-config": "http://localhost:3000",
      "/personnel-login": "http://localhost:3000",
      "/personnel-add-patient": "http://localhost:3000",
      "/get-patients": "http://localhost:3000",
      "/update-patient-plan": "http://localhost:3000",
      "/fetch-patient-plan": "http://localhost:3000",
      "/send-email-plan": "http://localhost:3000",
    }
  },
  build: {
    manifest: true,
    sourcemap: true,
    assetsDir: "code",
    target: ["esnext", "edge100", "firefox100", "chrome100", "safari18"]
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        sourcemap: false,
        runtimeCaching: [
          {
            urlPattern: new RegExp("^http://localhost:3000/"),
            handler: "StaleWhileRevalidate"
          }
        ]
      },
      injectRegister: "auto"
    }),
    reactRefresh()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxXb3JrXFxcXEludGVsbGlIb3NwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxXb3JrXFxcXEludGVsbGlIb3NwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Xb3JrL0ludGVsbGlIb3NwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5pbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXJlZnJlc2gnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiBcIi9cIixcclxuICBzZXJ2ZXI6IHtcclxuICAgIG9wZW46IHRydWUsXHJcbiAgICBwb3J0OiA1MTczLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9hZGQtaG9zcGl0YWwnOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy9hZG1pbi1sb2dpbic6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxyXG4gICAgICAnL2dldC1wZXJzb25uZWwnOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy9hZG1pbi1hZGQtcGVyc29ubmVsJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvc2F2ZS1jb25maWcnOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy9mZXRjaC1jb25maWcnOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy9wZXJzb25uZWwtbG9naW4nOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy9wZXJzb25uZWwtYWRkLXBhdGllbnQnOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy9nZXQtcGF0aWVudHMnOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy91cGRhdGUtcGF0aWVudC1wbGFuJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvZmV0Y2gtcGF0aWVudC1wbGFuJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcHJldmlldzoge1xyXG4gICAgcG9ydDogNTE3MyxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYWRkLWhvc3BpdGFsJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvYWRtaW4tbG9naW4nOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgJy9nZXQtcGVyc29ubmVsJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvYWRtaW4tYWRkLXBlcnNvbm5lbCc6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxyXG4gICAgICAnL3NhdmUtY29uZmlnJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvZmV0Y2gtY29uZmlnJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvcGVyc29ubmVsLWxvZ2luJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvcGVyc29ubmVsLWFkZC1wYXRpZW50JzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvZ2V0LXBhdGllbnRzJzogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICcvdXBkYXRlLXBhdGllbnQtcGxhbic6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxyXG4gICAgICAnL2ZldGNoLXBhdGllbnQtcGxhbic6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBtYW5pZmVzdDogdHJ1ZSxcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIGFzc2V0c0RpcjogXCJjb2RlXCIsXHJcbiAgICB0YXJnZXQ6IFtcImVzbmV4dFwiLCBcImVkZ2UxMDBcIiwgXCJmaXJlZm94MTAwXCIsIFwiY2hyb21lMTAwXCIsIFwic2FmYXJpMThcIl0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXHJcbiAgICAgIHN0cmF0ZWdpZXM6ICdnZW5lcmF0ZVNXJyxcclxuICAgICAgd29ya2JveDoge1xyXG4gICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcclxuICAgICAgICBjbGllbnRzQ2xhaW06IHRydWUsXHJcbiAgICAgICAgc291cmNlbWFwOiBmYWxzZSxcclxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiBuZXcgUmVnRXhwKCdeaHR0cDovL2xvY2FsaG9zdDozMDAwLycpLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiAnU3RhbGVXaGlsZVJldmFsaWRhdGUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICBpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxyXG4gICAgfSksXHJcbiAgICByZWFjdFJlZnJlc2goKSxcclxuICBdLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUCxTQUFTLG9CQUFvQjtBQUM5USxTQUFTLGVBQWU7QUFDeEIsT0FBTyxrQkFBa0I7QUFFekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsa0JBQWtCO0FBQUEsTUFDbEIsd0JBQXdCO0FBQUEsTUFDeEIsZ0JBQWdCO0FBQUEsTUFDaEIsaUJBQWlCO0FBQUEsTUFDakIsb0JBQW9CO0FBQUEsTUFDcEIsMEJBQTBCO0FBQUEsTUFDMUIsaUJBQWlCO0FBQUEsTUFDakIsd0JBQXdCO0FBQUEsTUFDeEIsdUJBQXVCO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxNQUNsQix3QkFBd0I7QUFBQSxNQUN4QixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixvQkFBb0I7QUFBQSxNQUNwQiwwQkFBMEI7QUFBQSxNQUMxQixpQkFBaUI7QUFBQSxNQUNqQix3QkFBd0I7QUFBQSxNQUN4Qix1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUNYLFFBQVEsQ0FBQyxVQUFVLFdBQVcsY0FBYyxhQUFhLFVBQVU7QUFBQSxFQUNyRTtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osU0FBUztBQUFBLFFBQ1AsdUJBQXVCO0FBQUEsUUFDdkIsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLFFBQ2QsV0FBVztBQUFBLFFBQ1gsZ0JBQWdCO0FBQUEsVUFDZDtBQUFBLFlBQ0UsWUFBWSxJQUFJLE9BQU8seUJBQXlCO0FBQUEsWUFDaEQsU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsSUFDbEIsQ0FBQztBQUFBLElBQ0QsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
