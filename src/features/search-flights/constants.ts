import { TripClass } from '~/shared/api/generated';
import type { Locales } from '~/shared/i18n/types';

export const TRAVEL_CLASS_TRANSLATIONS_MAP: Record<TripClass, Locales> = {
  [TripClass.Economy]: 'ECONOMY',
  [TripClass.Business]: 'BUSINESS',
  [TripClass.Comfort]: 'COMFORT',
  [TripClass.First]: 'FIRST',
};
