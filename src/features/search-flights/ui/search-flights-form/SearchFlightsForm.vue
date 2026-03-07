<script setup lang="ts">
  import { useAirports } from '~/entities/search-flights/api/useAirports';
  import { VDateInput } from 'vuetify/labs/VDateInput';
  import dayjs from 'dayjs';

  import { useTranslate } from '@/shared/i18n/useTranslate';
  import { useSearch } from '~/entities/search-flights/api/useSearch';
  import {
    type SearchFlightsParamsQueryVariables,
    TripClass,
  } from '@/shared/api/generated';
  import MenuSearchOptions from '~/entities/search-flights/ui/menu-search-options/MenuSearchOptions.vue';
  import type { EventWithTarget } from '~/shared/types';
  import { TRAVEL_CLASS_TRANSLATIONS_MAP } from '../../constants';

  const originCode = ref<string | null>(null);
  const destinationCode = ref<string | null>(null);
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

  const returnDateIntputRef = ref<InstanceType<typeof VDateInput>>();

  const body = computed<SearchFlightsParamsQueryVariables>(() => ({
    ...passengers,
    originLocation: originCode.value ?? '',
    destinationLocation: destinationCode.value ?? '',
    departureDate: departureDate.value as string,
    returnDate: returnDate.value,
    locale: 'ru',
    currency: 'rub',
    travelClass: travelClass.value,
  }));

  const { t } = useTranslate();

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
  const handleTravelClassChange = (e: EventWithTarget<HTMLInputElement>) => {
    travelClass.value = e.target.value as TripClass;
  };

  const add = (personType: keyof typeof passengers) => {
    passengers[personType] += 1;
  };
  const subtract = (personType: keyof typeof passengers) => {
    if (personType === 'adults' && passengers[personType] === 1) return;
    passengers[personType] -= 1;
  };

  const today = dayjs(new Date().toDateString()).valueOf();

  const disabledPastDates = (date: unknown) => {
    const calendarDate = dayjs(date as Date).valueOf();
    return calendarDate >= today;
  };

  const allowedReturnDates = (date: unknown) => {
    const calendarDateMilliseconds = dayjs(date as Date).valueOf();
    const pastDatesDisabled = disabledPastDates(date);

    if (!departureDate.value) {
      return pastDatesDisabled;
    }

    const departureMilliseconds = dayjs(departureDate.value).valueOf();
    return (
      pastDatesDisabled && calendarDateMilliseconds >= departureMilliseconds
    );
  };

  const handleSearch = () => {
    search(body.value);
  };

  const updateAfterDepartureSelected = () => {
    returnDate.value = '';
    returnDateIntputRef?.value?.click();

    // Don't remove otherwise there is a bug departure date field
    setTimeout(() => {
      returnDateIntputRef?.value?.focus();
    }, 0);
  };

  watch(searchFlightParamsResponse, (response) => {
    console.log(response);
  });
</script>

<template>
  <div class="form">
    <div class="direction-container">
      <VAutocomplete
        v-model="originCode"
        class="location-autocomplete form-input"
        :items="Object.values(originAirports)"
        :loading="originLoading"
        :no-data-text="t('START_TYPING')"
        :label="t('FROM')"
        :placeholder="t('FROM')"
        hide-details
        menu-icon=""
        item-title="name"
        item-value="code"
        clearable
        @input="handleOriginSearch"
        @update:model-value="handleUpdateOrigin"
      />
      <VAutocomplete
        v-model="destinationCode"
        class="location-autocomplete form-input"
        :items="Object.values(destinationAirports)"
        :loading="destinationLoading"
        :no-data-text="t('START_TYPING')"
        :label="t('WHERE')"
        :placeholder="t('WHERE')"
        hide-details
        menu-icon=""
        item-title="name"
        item-value="code"
        clearable
        @input="handleDestinationSearch"
        @update:model-value="handleUpdateDestination"
      />
    </div>
    <div class="calendar-container">
      <VDateInput
        v-model="departureDate"
        class="form-input"
        :allowed-dates="disabledPastDates"
        prepend-icon=""
        hide-details
        prepend-inner-icon="$calendar"
        width="100%"
        :label="t('DEPARTURE_DATE')"
        @update:model-value="updateAfterDepartureSelected"
      />
      <VDateInput
        ref="returnDateIntputRef"
        v-model="returnDate"
        class="form-input"
        :allowed-dates="allowedReturnDates"
        prepend-icon=""
        hide-details
        prepend-inner-icon="$calendar"
        width="100%"
        :label="t('RETURN_DATE')"
      />
    </div>
    <div class="passengers-container">
      <VMenu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <VBtn
            class="menu-btn form-input"
            v-bind="props"
            :ripple="false"
            prepend-icon="mdi-account"
            :append-icon="menu === true ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            height="100%"
          >
            {{ totalPassengers }} пас,
            {{ t(TRAVEL_CLASS_TRANSLATIONS_MAP[travelClass]) }}
          </VBtn>
        </template>
        <MenuSearchOptions
          :adults="passengers.adults"
          :children="passengers.children"
          :infants="passengers.infants"
          :travel-class="travelClass"
          :on-input="handleTravelClassChange"
          :add-adults="() => add('adults')"
          :subtract-adults="() => subtract('adults')"
          :add-children="() => add('children')"
          :subtract-children="() => subtract('children')"
          :add-infants="() => add('infants')"
          :subtract-infants="() => subtract('infants')"
        />
      </VMenu>
    </div>
    <VBtn class="search-btn" @click="handleSearch">Найти</VBtn>
  </div>
</template>

<style scoped lang="scss">
  .form {
    display: flex;
    justify-content: center;

    @include down('lg') {
      flex-direction: column;
    }
  }

  .form-input {
    background: rgb(255, 255, 255);
    // border-bottom: 0.1px solid #000;
  }

  .direction-container {
    display: flex;
    flex-wrap: nowrap;
    width: 40%;
  }

  .location-autocomplete {
    width: 50%;
    max-width: 50%;
  }

  .calendar-container {
    display: flex;
    width: 30%;
  }

  .passengers-container {
    width: 230px;
    max-width: 230px;
  }

  .menu-btn {
    width: 100%;
  }

  .search-btn {
    height: auto !important;
    background-color: #5352ee;
    color: #fff;
  }

  .menu-btn {
    width: 100%;
  }
</style>
