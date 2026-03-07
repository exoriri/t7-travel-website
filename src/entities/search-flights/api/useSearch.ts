import {
  useSearchFlightsParamsLazyQuery,
  type SearchFlightsParamsQueryVariables,
} from '@/shared/api/generated';

export const useSearch = () => {
  const { result, loading, load } = useSearchFlightsParamsLazyQuery();

  const search = (variables: SearchFlightsParamsQueryVariables) => {
    load(null, { ...variables });
  };

  const data = computed(() => result.value?.searchFlightsParams);

  return {
    search,
    data,
    loading,
  };
};
