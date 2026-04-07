import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
const VERSION = '1.0.1';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
      },
      devOptions: {
        enabled: false, // Disable SW in dev
        type: 'module', // Use module mode in dev
      },
      // workbox: {
      //   runtimeCaching: [
      //     {
      //       urlPattern: /\.(png|jpg|jpeg|svg|webp|gif|ico)$/,
      //       handler: 'CacheFirst' as const,
      //       options: {
      //         cacheName: `images-cache-${VERSION}`,
      //         expiration: {
      //           maxEntries: 50,
      //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      //         },
      //       },
      //     },
      //     {
      //       urlPattern: ({ url }) => url.pathname.startsWith('/api'),
      //       handler: 'CacheFirst' as const,
      //       options: {
      //         cacheName: `api-cache-${VERSION}`,
      //         cacheableResponse: {
      //           statuses: [0, 200], //only caching gets
      //         },
      //       },
      //     },
      //     {
      //       urlPattern: ({ url }) => url.pathname.startsWith('/screenshots'),
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: `screenshots-cache-${VERSION}`,
      //         expiration: {
      //           maxEntries: 10,
      //           maxAgeSeconds: 30 * 24 * 60 * 60, //30 days
      //         },
      //       },
      //     },
      //   ],
      // },
      includeAssets: ['**/*.{ico,svg,jpeg,jpg,png,webp}'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'JN System',
        short_name: 'JNVA',
        description: 'JN school system',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        ],
        screenshots: [
          { sizes: '728x410', type: 'image/jpeg', form_factor: 'wide', src: '/screenshots/728x410.jpeg' },
          { src: '/screenshots/736x1309.jpeg', sizes: '736x1309', form_factor: 'narrow', type: 'image/jpeg' },
        ],

        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        //android
        scope: '/', // ← Add this
        orientation: 'any', // ← Add this ("portrait" or "any")
        categories: ['utilities', 'productivity'], // ← Add relevant categories
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
