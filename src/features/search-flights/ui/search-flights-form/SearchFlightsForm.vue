<script setup lang="ts">
  import { useAirports } from '~/entities/search-flights/api/useAirports';
  import { VDateInput } from 'vuetify/labs/VDateInput';
  import dayjs from 'dayjs';

  import { useTranslate } from '@/shared/i18n/useTranslate';
  import { useSearch } from '~/entities/search-flights/api/useSearch';
  import {
    TripClass,
    type SearchFlightsParamsQueryVariables,
  } from '@/shared/api/generated';
  import MenuSearchOptions from '~/entities/search-flights/ui/menu-search-options/MenuSearchOptions.vue';
  import { DateFormats, type EventWithTarget } from '~/shared/types';
  import { TRAVEL_CLASS_TRANSLATIONS_MAP } from '../../constants';
  import { useValidationSchema } from '~/entities/search-flights/model/useValidationSchema';
  import { useField, useForm } from 'vee-validate';
  import { ROUTES } from '~/shared/constants';

  const menu = ref(false);
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
  const { data: searchFlightParamsResponse, loading: searching, search } = useSearch();
  const validationSchema = useValidationSchema();
  const { handleSubmit } = useForm({
    validationSchema,
  });
  const { value: originCode, errorMessage: originCodeError } = useField<
    string | null
  >('originCode');
  const { value: destinationCode, errorMessage: destinationCodeError } =
    useField<string | null>('destinationCode');
  const { value: departureDate, errorMessage: departureDateError } = useField<
    string | null
  >('departureDate');

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

  const handleSearch = handleSubmit(
    (values) => {
      const body: SearchFlightsParamsQueryVariables = {
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        originLocation: values.originCode as unknown as string,
        destinationLocation: values.destinationCode as unknown as string,
        departureDate: dayjs(values.departureDate as unknown as Date).format(
          DateFormats.IsoDate
        ),
        returnDate: returnDate.value
          ? dayjs(returnDate.value).format(DateFormats.IsoDate)
          : undefined,
        travelClass: travelClass.value,
        locale: 'ru',
        currency: 'RUB',
      };
      search(body);
    },
    (error) => {
      console.log(error, 'errrors');
    }
  );

  const updateAfterDepartureSelected = () => {
    returnDate.value = '';
    returnDateIntputRef?.value?.click();

    // Don't remove otherwise there is a bug departure date field
    setTimeout(() => {
      returnDateIntputRef?.value?.focus();
    }, 0);
  };

  watch(searchFlightParamsResponse, async (response) => {
    if (response) {
      const { searchId, resultsUrl } = response;
      await navigateTo({
        path: ROUTES.offers,
        state: {
          searchId,
          resultsUrl,
        },
      });
    }
  });
</script>

<template>
  <form class="form" @submit.prevent="handleSearch">
    <div class="direction-container">
      <VAutocomplete
        v-model="originCode"
        name="originCode"
        class="location-autocomplete form-input"
        hide-details
        :error-messages="originCodeError"
        :items="Object.values(originAirports)"
        :loading="originLoading"
        :no-data-text="t('START_TYPING')"
        :label="t('FROM')"
        :placeholder="t('FROM')"
        menu-icon=""
        item-title="name"
        item-value="code"
        clearable
        @input="handleOriginSearch"
      />
      <VAutocomplete
        v-model="destinationCode"
        class="location-autocomplete form-input"
        name="destinationCode"
        :error-messages="destinationCodeError"
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
      />
    </div>
    <div class="calendar-container">
      <VDateInput
        v-model="departureDate"
        class="form-input"
        :error-messages="departureDateError"
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
        clearable
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
            {{ totalPassengers }} {{ t('PAX') }},
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
    <VBtn type="submit" class="search-btn" :loading="searching">{{ t('SEARCH') }}</VBtn>
  </form>
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
