import { useI18n as useVueI18n } from 'vue-i18n';

import homeRu from './locales/ru/home.json';

type HomeRu = keyof typeof homeRu;

type Locales = HomeRu & {};

export const useTranslate = () => {
  const i18n = useVueI18n();

  const t = (
    key: Locales,
    options?: Record<string, unknown | unknown[] | number>
  ) => {
    if (!options) {
      return i18n.t(key);
    }
    return i18n.t(key, options);
  };

  return {
    ...i18n,
    t,
  };
};
