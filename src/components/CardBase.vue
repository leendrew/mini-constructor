<script lang="ts">
import { defineComponent } from 'vue';
import Stack from './ui/Stack.vue';
export default defineComponent({
  name: 'CardBase',
});
</script>

<template>
  <v-sheet class="pa-4 card" rounded outlined tag="article">
    <Stack class="card-inner" direction="column" :gap="4">
      <slot />
    </Stack>
  </v-sheet>
</template>

<style scoped>
.card {
  position: relative;
}
.card-inner {
  height: 100%;
}
</style>
