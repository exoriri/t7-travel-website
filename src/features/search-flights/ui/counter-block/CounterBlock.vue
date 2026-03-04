<script setup lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
    disableSubtract?: boolean;
    onAdd?: () => void;
    onSubtract?: () => void;
  }

  const { title, subtitle, onAdd, onSubtract } = defineProps<Props>();
</script>

<template>
  <div class="container">
    <VBtn :disabled="disableSubtract" class="btn" @click="onSubtract">
      <VIcon color="#fff">mdi-minus-thick</VIcon>
    </VBtn>
    <div class="text-container">
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <VBtn class="btn" @click="onAdd">
      <VIcon color="#fff">mdi-plus-thick</VIcon>
    </VBtn>
  </div>
</template>

<style scoped lang="scss">
  $COUNTER_BTN_SIZE: 50px;

  .container {
    display: flex;
    width: 300px;
    justify-content: space-between;
  }

  .btn {
    background-color: #5352ee;
    max-width: $COUNTER_BTN_SIZE;
    min-width: $COUNTER_BTN_SIZE;
    max-height: $COUNTER_BTN_SIZE;
    min-height: $COUNTER_BTN_SIZE;
    border-radius: 10px;

    &:disabled {
      background-color: #a8a8f6;
    }
  }

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }
</style>
