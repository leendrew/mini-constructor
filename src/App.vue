<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
export default defineComponent({
  name: 'App',
});
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}

.w-fc {
  width: fit-content;
}
</style>
