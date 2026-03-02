<script setup lang="ts">
  import { useAirports } from '@/entities/flights/api/useAirports';

  interface Props {
    locationRef: Ref<string>;
  }

  const { locationRef } = defineProps<Props>();

  const { airports, loading, handleAutocomplete } = useAirports();

  const handleUpdateOrigin = (value: string) => {
    //eslint-disable-next-line vue/no-mutating-props
    locationRef.value = value;
  };
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->

  <VAutocomplete
    v-model="locationRef.value"
    :items="Object.values(airports)"
    :loading="loading"
    no-data-text="Начните печатать..."
    label="Откуда"
    hide-details
    item-title="name"
    item-value="code"
    @input="handleAutocomplete"
    @update:model-value="handleUpdateOrigin"
  />
</template>
