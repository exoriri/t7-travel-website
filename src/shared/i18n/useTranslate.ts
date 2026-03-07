import { useI18n as useVueI18n } from 'vue-i18n';
import type { Locales } from './types';

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
