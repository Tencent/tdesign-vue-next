import { VitePWAOptions } from 'vite-plugin-pwa';

export default {
  strategies: 'injectManifest',
  includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
  injectManifest: {
    maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
  },
  manifest: {
    name: 'TDesign for Vue Next',
    short_name: 'TDesign',
    description: 'TDesign UI vue-next',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
} as VitePWAOptions;
