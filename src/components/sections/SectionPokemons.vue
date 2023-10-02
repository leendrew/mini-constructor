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
  methods: {
    deleteSection() {
      this.$emit('deleteSection');
    },
  },
});
</script>

<template>
  <v-sheet class="mt-6 pa-6" rounded outlined tag="section">
    <p class="text-h3">Section Pokemons</p>
    <template v-if="isOnEditMod">
      <v-row class="mt-4">
        <v-col>
          <v-btn color="red" text outlined @click="deleteSection">Delete Section</v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-if="!data.length && !isOnEditMod">
      <p class="text-h5 text-center">This section is empty :( Turn on Edit mod and add content</p>
    </template>
  </v-sheet>
</template>

<style scoped></style>
