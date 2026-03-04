import I18NextVue from 'i18next-vue';
import i18next from 'i18next';

// 1. Define your translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to our website!',
      greeting: 'Hello, {{name}}!',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur notre site web !',
      greeting: 'Bonjour, {{name}} !',
    },
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  i18next.init({
    resources,
    fallbackLng: 'en', // Default language if detection fails
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

  nuxtApp.vueApp.provide(I18NextVue, i18next);
});
