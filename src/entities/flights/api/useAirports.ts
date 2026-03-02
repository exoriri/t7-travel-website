import {
  useAirportsLazyQuery,
  type AirportsQuery,
} from '@/shared/api/generated';
import { normalize } from '@/shared/lib/normalize';
import type { EventWithTarget } from '~/shared/types';

export const useAirports = () => {
  const { load, result, loading } = useAirportsLazyQuery();

  const handleAutocomplete = (e: EventWithTarget<HTMLInputElement>) => {
    load(null, { text: e.target.value, locale: 'ru' });
  };

  const airports = computed<Record<string, AirportsQuery['airports'][0]>>(
    () => {
      if (!result.value?.airports) return {};
      return normalize(result.value.airports, 'name');
    }
  );

  return {
    airports,
    loading,
    handleAutocomplete,
  };
};
