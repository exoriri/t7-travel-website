<script setup lang="ts">
  import { useTranslate } from '@/shared/i18n/useTranslate';
  import { CounterBlock } from '../counter-block';
  import { TripClass } from '~/shared/api/generated';
  import type { EventWithTarget } from '~/shared/types';

  interface Props {
    adults: number;
    children: number;
    infants: number;
    travelClass: TripClass;
    onInput: (e: EventWithTarget<HTMLInputElement>) => void;
    addAdults: () => void;
    subtractAdults: () => void;
    addChildren: () => void;
    subtractChildren: () => void;
    addInfants: () => void;
    subtractInfants: () => void;
  }

  const {
    adults,
    children,
    infants,
    travelClass,
    addAdults,
    subtractAdults,
    addChildren,
    subtractChildren,
    addInfants,
    subtractInfants,
  } = defineProps<Props>();

  const { t } = useTranslate();
</script>

<template>
  <VCard class="card">
    <h2 class="card-title">{{ t('PASSANGERS') }}</h2>
    <CounterBlock
      :title="`${t('ADULTS_COUNT', { count: adults })} `"
      :subtitle="`>12 ${t('YEARS')}`"
      :disable-subtract="adults === 1"
      :on-add="addAdults"
      :on-subtract="subtractAdults"
    />
    <CounterBlock
      :title="`${children} Дети`"
      :subtitle="`2-12 ${t('YEARS')}`"
      :disable-subtract="children === 0"
      :on-add="addChildren"
      :on-subtract="subtractChildren"
    />
    <CounterBlock
      :title="`${infants} Младенцы`"
      :subtitle="`<2 ${t('YEARS')}`"
      :disable-subtract="infants === 0"
      :on-add="addInfants"
      :on-subtract="subtractInfants"
    />
    <VDivider :thickness="2" class="border-opacity-25" color="info" />
    <h2 class="card-title">{{ t('SERVICE_CLASS') }}</h2>
    <VRadioGroup :model-value="travelClass" @input="onInput">
      <VRadio
        color="#5352EE"
        :label="t('ECONOMY')"
        :value="TripClass.Economy"
      />
      <VRadio
        color="#5352EE"
        :label="t('BUSINESS')"
        :value="TripClass.Business"
      />
      <VRadio
        color="#5352EE"
        :label="t('COMFORT')"
        :value="TripClass.Comfort"
      />
      <VRadio color="#5352EE" :label="t('FIRST')" :value="TripClass.First" />
    </VRadioGroup>
  </VCard>
</template>

<style lang="scss" scoped>
  .card {
    padding: 0px 15px;
    padding-top: 20px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .card-title {
    font-weight: 600;
  }
</style>
