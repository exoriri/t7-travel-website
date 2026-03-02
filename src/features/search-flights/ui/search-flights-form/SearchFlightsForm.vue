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

  const { airports, loading, handleAutocomplete } = useAirports();

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
        :items="Object.values(airports)"
        :loading="loading"
        no-data-text="Начните печатать..."
        label="Откуда"
        hide-details
        item-title="name"
        item-value="code"
        @input="handleAutocomplete"
        @update:model-value="handleUpdateOrigin"
      >
      </VAutocomplete>
      <VAutocomplete
        v-model="destinationCode"
        :items="Object.values(airports)"
        :loading="loading"
        no-data-text="Начните печатать..."
        label="Куда"
        hide-details
        item-title="name"
        item-value="code"
        @input="handleAutocomplete"
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
