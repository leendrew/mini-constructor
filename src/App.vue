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

.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ws-pw {
  white-space: pre-wrap;
}

.v-input {
  flex-grow: 0;
}

.handle {
  cursor: grab;
}

.ghost {
  opacity: 0.3;
  outline: 2px dashed #000000;
}
</style>
