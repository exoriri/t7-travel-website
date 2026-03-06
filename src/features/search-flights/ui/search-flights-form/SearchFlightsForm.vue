<script setup lang="ts">
  import { useAirports } from '@/entities/flights/api/useAirports';
  import { VDateInput } from 'vuetify/labs/VDateInput';
  import dayjs from 'dayjs';

  import { CounterBlock } from '../counter-block';
  import { useTranslate } from '@/shared/i18n/useTranslate';
  import { useSearch } from '@/entities/flights/api/useSearch';
  import {
    type SearchFlightsParamsQueryVariables,
    TripClass,
  } from '@/shared/api/generated';

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
    returnDateIntputRef?.value?.focus();
    returnDateIntputRef?.value?.click();
  };

  watch(searchFlightParamsResponse, (response) => {
    console.log(response);
  });
  watch(departureDate, (val) => {
    console.log(val);
  });
</script>

<template>
  <div class="form">
    <div class="direction-container">
      <VAutocomplete
        v-model="originCode"
        class="location-autocomplete"
        :items="Object.values(originAirports)"
        :loading="originLoading"
        no-data-text="Начните печатать..."
        :label="t('FROM')"
        placeholder="Откуда"
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
        class="location-autocomplete"
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
    </div>
    <div class="calendar-container">
      <VDateInput
        v-model="departureDate"
        :allowed-dates="disabledPastDates"
        prepend-icon=""
        hide-details
        prepend-inner-icon="$calendar"
        width="100%"
        label="Дата вылета"
        @update:model-value="updateAfterDepartureSelected"
      />
      <VDateInput
        ref="returnDateIntputRef"
        v-model="returnDate"
        :allowed-dates="allowedReturnDates"
        prepend-icon=""
        hide-details
        prepend-inner-icon="$calendar"
        width="100%"
        label="Дата прилета"
      />
    </div>
    <div class="passengers-container">
      <VMenu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <VBtn
            class="menu-btn"
            v-bind="props"
            :ripple="false"
            prepend-icon="mdi-account"
            :append-icon="menu === true ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            height="100%"
          >
            {{ totalPassengers }} пас, эконом
          </VBtn>
        </template>
        <VCard class="card">
          <CounterBlock
            :title="`${passengers.adults} Взрослые`"
            subtitle=">12 лет"
            :disable-subtract="passengers.adults === 1"
            :on-add="() => add('adults')"
            :on-subtract="() => subtract('adults')"
          />
          <CounterBlock
            :title="`${passengers.children} Дети`"
            subtitle="2-12 лет"
            :disable-subtract="passengers.children === 0"
            :on-add="() => add('children')"
            :on-subtract="() => subtract('children')"
          />
          <CounterBlock
            :title="`${passengers.infants} Младенцы`"
            subtitle="<2 лет"
            :disable-subtract="passengers.infants === 0"
            :on-add="() => add('infants')"
            :on-subtract="() => subtract('infants')"
          />
        </VCard>
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
    width: 20%;
  }

  .card {
    padding: 10px 15px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 15px;
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
