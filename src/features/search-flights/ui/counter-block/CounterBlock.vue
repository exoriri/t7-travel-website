<script setup lang="ts">
  import { StyledBtn, StyledContainer, StyledTextContainer } from './styles';

  interface Props {
    title: string;
    subtitle?: string;
    onAdd?: () => void;
    onSubtract?: () => void;
  }

  const { title, subtitle, onAdd, onSubtract } = defineProps<Props>();
</script>

<template>
  <StyledContainer>
    <StyledBtn @click="onSubtract">
      <VIcon color="#fff">mdi-minus-thick</VIcon>
    </StyledBtn>
    <StyledTextContainer>
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </StyledTextContainer>
    <StyledBtn @click="onAdd">
      <VIcon color="#fff">mdi-plus-thick</VIcon>
    </StyledBtn>
  </StyledContainer>
</template>
