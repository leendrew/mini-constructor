<script lang="ts">
import { defineComponent } from 'vue';
import Stack from '@/components/ui/Stack.vue';
export default defineComponent({ name: 'SectionBase' });
</script>

<template>
  <v-sheet class="pa-6" tag="section" rounded outlined>
    <Stack direction="column" :gap="4">
      <slot />
    </Stack>
  </v-sheet>
</template>
