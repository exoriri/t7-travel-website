<script setup lang="ts">
  import { PageWrapper } from '@/shared/ui/page-wrapper';
  import { SearchFlightsForm } from '~/features/search-flights/ui/search-flights-form';
</script>

<template>
  <PageWrapper>
    <div class="imaged-bg">
      <div style="margin-bottom: 5%">
        <SearchFlightsForm />
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped>
  .imaged-bg {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-image: url('../../../../assets/images/unsplash_TrhLCn1abMU.png');
    background-position: center;
    background-size: cover;
    mask: radial-gradient(60% 70px at bottom, #0000 100%, #000);
  }
</style>
