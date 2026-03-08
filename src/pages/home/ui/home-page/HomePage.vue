<script setup lang="ts">
  import { PageWrapper } from '@/shared/ui/page-wrapper';
  import { SearchFlightsForm } from '~/features/search-flights/ui/search-flights-form';
</script>

<template>
  <PageWrapper>
    <div class="imaged-bg">
      <SearchFlightsForm />
    </div>
  </PageWrapper>
</template>

<style scoped>
  .imaged-bg {
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: url('../../../../assets/images/unsplash_TrhLCn1abMU.png');
    background-position: center;
    background-size: cover;
    border-bottom-left-radius: 10%; 
    border-bottom-right-radius: 10%;
  }
</style>
