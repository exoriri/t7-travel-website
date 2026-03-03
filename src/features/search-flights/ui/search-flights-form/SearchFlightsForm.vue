<script setup lang="ts">
  import { useAirports } from '@/entities/flights/api/useAirports';
  import { VAutocomplete, VBtn, VMenu } from 'vuetify/components';

  import {
    StyledForm,
    StyledDirectionsContainer,
    StyledCalendarContainer,
    StyledPassangersContainer,
    StyledVCard,
  } from './styles';
  import { CounterBlock } from '../counter-block';

  const originCode = ref('');
  const destinationCode = ref('');
  const menu = ref(false);
  const passangersCount = ref(1);

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
      <VAutocomplete
        hide-details
        menu-icon=""
        prepend-icon=""
        label="Туда"
        clearable
      />
      <VAutocomplete
        hide-details
        menu-icon=""
        prepend-icon=""
        label="Обратно"
        clearable
      />
    </StyledCalendarContainer>
    <StyledPassangersContainer>
      <VMenu v-model="menu">
        <template #activator="{ props }">
          <VBtn
            v-bind="props"
            :ripple="false"
            prepend-icon="mdi-account"
            :append-icon="menu === true ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            height="100%"
          >
            {{ passangersCount }} пас, эконом
          </VBtn>
        </template>
        <StyledVCard>
          <CounterBlock title="Взрослые" subtitle=">12 лет" />
          <CounterBlock title="Дети" subtitle="2-12 лет" />
          <CounterBlock title="Младенцы" subtitle="<2 лет" />
        </StyledVCard>
      </VMenu>
    </StyledPassangersContainer>
    <VBtn>Найти</VBtn>
  </StyledForm>
</template>
