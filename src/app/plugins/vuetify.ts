import { defineNuxtPlugin } from 'nuxt/app';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import { VDateInput } from 'vuetify/labs/VDateInput';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import '@mdi/font/css/materialdesignicons.css';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      VDateInput,
    },
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    display: {},
    theme: {},
  });

  nuxtApp.vueApp.use(vuetify);
});
// theme: {
//   defaultTheme: "light",
//   themes: {
//     light: {
//       colors: {
//         primary: "#1976D2",
//         secondary: "#424242",
//         accent: "#82B1FF",
//         error: "#FF5252",
//         warning: "#FFC107",
//         info: "#2196F3",
//         success: "#4CAF50",
//       },
//     },
//     dark: {
//       colors: {
//         primary: "#BB86FC",
//         secondary: "#03DAC6",
//         accent: "#03DAC6",
//         error: "#CF6679",
//         warning: "#FFC107",
//         info: "#2196F3",
//         success: "#4CAF50",
//       },
//     },
//   },
// },
