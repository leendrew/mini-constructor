<script lang="ts">
import { defineComponent } from 'vue';
import type { GlobalState } from '@/store';
export default defineComponent({
  name: 'Header',
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
  <v-app-bar app color="white" elevation="0">
    <v-container>
      <v-row justify="center">
        <v-switch
          v-model="isOnEditMod"
          :label="isOnEditMod ? 'Edit mode' : 'View mode'"
          hide-details
        />
      </v-row>
    </v-container>
  </v-app-bar>
</template>
