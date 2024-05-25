<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/AppHeader.vue';

export default defineComponent({
  name: 'App',
});
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}

.d-contents {
  display: contents;
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
