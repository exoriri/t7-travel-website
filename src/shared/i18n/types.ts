import homeRu from './locales/ru/home.json';

type HomeRu = keyof typeof homeRu;

export type Locales = HomeRu & {};
