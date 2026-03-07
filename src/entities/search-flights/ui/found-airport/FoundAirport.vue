<script setup lang="ts">
  import { type Autocomplete } from '@/shared/api/generated';

  interface Props {
    name: Autocomplete['name'];
    type: Autocomplete['type'];
    onClick: () => void;
  }

  const { name, onClick } = defineProps<Props>();
</script>

<template>
  <v-list-item @click="onClick">
    <v-btn variant="text">
      {{ name }}
    </v-btn>
  </v-list-item>
</template>
