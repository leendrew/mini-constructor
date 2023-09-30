<script lang="ts">
import { defineComponent } from 'vue';
import SectionText from '@/components/sections/SectionText.vue';
import SectionCards from '@/components/sections/SectionCards.vue';
import SectionPokemons from '@/components/sections/SectionPokemons.vue';
import type { SectionState } from '@/store';
export default defineComponent({
  name: 'Home',
  computed: {
    sections() {
      return (this.$store.state.section as SectionState).sections;
    },
  },
});
</script>

<template>
  <v-container>
    <template v-if="!!sections.length">
      <template v-for="section of sections">
        <SectionText :key="section.id" v-if="section.type === 'text'" :data="section.data" />
        <SectionCards :key="section.id" v-else-if="section.type === 'cards'" :data="section.data" />
        <SectionPokemons
          :key="section.id"
          v-else-if="section.type === 'pokemons'"
          :data="section.data"
        />
      </template>
    </template>
    <template v-else>
      <v-sheet class="mt-6 pa-6" rounded outlined tag="section">
        <p class="text-h5 text-center">
          Your sections are empty :( Turn on Edit mod and add them (they will be saved)
        </p>
      </v-sheet>
    </template>
  </v-container>
</template>
