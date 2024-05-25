<script lang="ts">
import { defineComponent } from 'vue';
import type { GlobalState } from '@/store';
import Stack from '@/components/ui/Stack.vue';

export default defineComponent({
  name: 'ModeToggler',
  components: {
    Stack,
  },
  computed: {
    isOnEditMod: {
      get() {
        return (this.$store.state.global as GlobalState).isOnEditMod;
      },
      set() {
        this.$store.dispatch('toggleIsOnEditMod');
      },
    },
  },
});
</script>

<template>
  <Stack :gap="4">
    <span :class="{ 'grey--text': isOnEditMod }">View Mode</span>
    <v-switch
      v-model="isOnEditMod"
      hideDetails
    />
    <span :class="{ 'grey--text': !isOnEditMod }">Edit Mode</span>
  </Stack>
</template>
