<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<style scoped>
  .wrapper {
    background-color: #f1ece8;
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;
  }
  .centered {
    max-width: 1600px;
    margin: 0 auto;
  }
</style>
