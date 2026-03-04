<script setup lang="ts">
  import { useAirports } from '@/entities/flights/api/useAirports';

  import {
    StyledForm,
    StyledDirectionsContainer,
    StyledCalendarContainer,
    StyledPassangersContainer,
    StyledVCard,
    StyledSearchButton,
    StyledMenuButton,
    StyledLocationAutocomplete,
  } from './styles';
  import { CounterBlock } from '../counter-block';
  import { useSearch } from '@/entities/flights/api/useSearch';
  import {
    type SearchFlightsParamsQueryVariables,
    TripClass,
  } from '~/shared/api/generated';

  const originCode = ref('');
  const destinationCode = ref('');
  const menu = ref(false);
  const departureDate = ref<string | null>(null);
  const returnDate = ref<string | null>(null);
  const passengers = reactive({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const travelClass = ref<TripClass>(TripClass.Economy);

  const totalPassengers = computed(
    () => passengers.adults + passengers.children + passengers.infants
  );
  const body = computed<SearchFlightsParamsQueryVariables>(() => ({
    ...passengers,
    originLocation: originCode.value,
    destinationLocation: destinationCode.value,
    departureDate: departureDate.value as string,
    returnDate: returnDate.value,
    locale: 'ru',
    currency: 'rub',
    travelClass: travelClass.value,
  }));

  const {
    airports: originAirports,
    loading: originLoading,
    handleAutocomplete: handleOriginSearch,
  } = useAirports();
  const {
    airports: destinationAirports,
    loading: destinationLoading,
    handleAutocomplete: handleDestinationSearch,
  } = useAirports();
  const { data: searchFlightParamsResponse, search } = useSearch();

  const handleUpdateOrigin = (value: string) => {
    originCode.value = value;
  };
  const handleUpdateDestination = (value: string) => {
    destinationCode.value = value;
  };

  const add = (personType: keyof typeof passengers) => () => {
    passengers[personType] += 1;
  };
  const substract = (personType: keyof typeof passengers) => () => {
    if (personType === 'adults' && passengers[personType] === 1) return;
    passengers[personType] -= 1;
  };

  const addAdults = add('adults');
  const subtractAdults = substract('adults');

  const handleSearch = () => {
    search(body.value);
  };

  watch(searchFlightParamsResponse, (response) => {
    console.log(response);
  });
  watch(departureDate, (val) => {
    console.log(val);
  });
</script>

<template>
  <StyledForm>
    <StyledDirectionsContainer>
      <StyledLocationAutocomplete
        v-model="originCode"
        :items="Object.values(originAirports)"
        :loading="originLoading"
        no-data-text="Начните печатать..."
        label="Откуда"
        placeholder="Откуда"
        hide-details
        menu-icon=""
        item-title="name"
        item-value="code"
        clearable
        @input="handleOriginSearch"
        @update:model-value="handleUpdateOrigin"
      />
      <StyledLocationAutocomplete
        v-model="destinationCode"
        :items="Object.values(destinationAirports)"
        :loading="destinationLoading"
        no-data-text="Начните печатать..."
        label="Куда"
        placeholder="Куда"
        hide-details
        menu-icon=""
        item-title="name"
        item-value="code"
        clearable
        @input="handleDestinationSearch"
        @update:model-value="handleUpdateDestination"
      />
    </StyledDirectionsContainer>
    <StyledCalendarContainer>
      <VDateInput
        v-model="departureDate"
        prepend-icon=""
        hide-details
        prepend-inner-icon="$calendar"
        width="100%"
        label="Дата вылета"
      />
      <VDateInput
        v-model="returnDate"
        prepend-icon=""
        hide-details
        prepend-inner-icon="$calendar"
        width="100%"
        label="Дата прилета"
      />
    </StyledCalendarContainer>
    <StyledPassangersContainer>
      <VMenu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <StyledMenuButton
            v-bind="props"
            :ripple="false"
            prepend-icon="mdi-account"
            :append-icon="menu === true ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            height="100%"
          >
            {{ totalPassengers }} пас, эконом
          </StyledMenuButton>
        </template>
        <StyledVCard>
          <CounterBlock
            title="Взрослые"
            subtitle=">12 лет"
            :disable-subtract="passengers.adults === 1"
            :on-add="addAdults"
            :on-subtract="subtractAdults"
          />
          <CounterBlock title="Дети" subtitle="2-12 лет" />
          <CounterBlock title="Младенцы" subtitle="<2 лет" />
        </StyledVCard>
      </VMenu>
    </StyledPassangersContainer>
    <StyledSearchButton @click="handleSearch">Найти</StyledSearchButton>
  </StyledForm>
</template>
