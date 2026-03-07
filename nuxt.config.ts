import { resolve } from 'path';
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',

  alias: {
    '@': resolve(__dirname, 'src'),
  },
  dir: {
    pages: 'app/routes',
    plugins: 'app/plugins',
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/css/variables.scss" as *;
            @use "@/assets/css/mixins.scss" as *;
          `,
        },
      },
    },
  },
  modules: [
    async (_options, nuxt) => {
      nuxt.hook('vite:extendConfig', (_config) => {});
    },
    '@nuxtjs/i18n',
  ],
  i18n: {
    restructureDir: 'src/shared/i18n',
    defaultLocale: 'ru',
    locales: [{ code: 'ru', name: 'Russian', files: ['ru/home.json'] }],
    strategy: 'prefix_except_default',
  },
});
