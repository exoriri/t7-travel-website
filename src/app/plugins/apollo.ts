import { defineNuxtPlugin } from "nuxt/app";
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '@/shared/api/client';

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.provide(DefaultApolloClient, apolloClient);
});
