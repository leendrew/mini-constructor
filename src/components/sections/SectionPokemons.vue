<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { SectionPokemonsData, GlobalState } from '@/store';
export default defineComponent({
  name: 'SectionPokemons',
  props: {
    data: {
      type: Array as PropType<SectionPokemonsData[]>,
      required: true,
    },
  },
  computed: {
    isOnEditMod() {
      return (this.$store.state.global as GlobalState).isOnEditMod;
    },
  },
});
</script>

<template>
  <v-sheet class="mt-6 pa-6" rounded outlined tag="section">
    <p class="text-h3">Section Pokemons</p>
  </v-sheet>
</template>

<style scoped></style>
