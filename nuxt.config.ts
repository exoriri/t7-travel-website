import { resolve } from 'path';
import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',

  alias: {
    '@': resolve(__dirname, 'src'),
  },
  dir: {
    pages: 'app/routes',
  },
  css: ['@/assets/css/main.css', 'vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    ssr: {
      noExternal: [
        'vuetify',
        '@apollo/client',
        'ts-invariant',
        'zen-observable',
        'symbol-observable',
      ],
    },
    plugins: [
      vuetify({
        autoImport: true,
      }),
    ],
  },
  modules: [
    async (_options, nuxt) => {
      nuxt.hook('vite:extendConfig', (_config) => {});
    },
  ],
});
