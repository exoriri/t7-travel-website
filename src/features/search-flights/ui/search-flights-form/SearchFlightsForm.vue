<script setup lang="ts">
  import { useAirports } from '@/entities/flights/api/useAirports';
  import { VAutocomplete, VBtn } from 'vuetify/components';

  import {
    StyledForm,
    StyledDirectionsContainer,
    StyledCalendarContainer,
  } from './styles';

  const originCode = ref('');
  const destinationCode = ref('');

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

  const handleUpdateOrigin = (value: string) => {
    originCode.value = value;
  };
  const handleUpdateDestination = (value: string) => {
    destinationCode.value = value;
  };
</script>

<template>
  <StyledForm>
    <StyledDirectionsContainer>
      <VAutocomplete
        v-model="originCode"
        :items="Object.values(originAirports)"
        :loading="originLoading"
        no-data-text="Начните печатать..."
        label="Откуда"
        hide-details
        item-title="name"
        item-value="code"
        @input="handleOriginSearch"
        @update:model-value="handleUpdateOrigin"
      >
      </VAutocomplete>
      <VAutocomplete
        v-model="destinationCode"
        :items="Object.values(destinationAirports)"
        :loading="destinationLoading"
        no-data-text="Начните печатать..."
        label="Куда"
        hide-details
        item-title="name"
        item-value="code"
        @input="handleDestinationSearch"
        @update:model-value="handleUpdateDestination"
      />
    </StyledDirectionsContainer>
    <StyledCalendarContainer>
      <VAutocomplete hide-details prepend-icon="" label="Туда" clearable />
      <VAutocomplete hide-details prepend-icon="" label="Обратно" clearable />
    </StyledCalendarContainer>
    <VBtn>Найти</VBtn>
  </StyledForm>
</template>
