<script lang="ts">
import { defineComponent } from 'vue';
import SectionText from '@/components/sections/SectionText.vue';
import SectionCards from '@/components/sections/SectionCards.vue';
import SectionPokemons from '@/components/sections/SectionPokemons.vue';
interface SectionText {
  id: number;
  type: 'text';
  data: {
    title: string;
    description: string;
  };
}
interface SectionCards {
  id: number;
  type: 'cards';
  data: {
    id: number;
    title: string;
    description: string;
  }[];
}
interface SectionPokemons {
  id: number;
  type: 'pokemons';
  data: {
    id: number;
    title: string;
    description: string;
  }[];
}
type Section = SectionText | SectionCards | SectionPokemons;
export default defineComponent({
  name: 'Home',
  data() {
    return {
      sections: [
        {
          id: 0,
          type: 'text',
          data: {
            title: 'Title',
            description: 'description',
          },
        },
        {
          id: 1,
          type: 'cards',
          data: [
            {
              id: 0,
              title: 'card 1',
              description: 'description of card 1',
            },
            {
              id: 1,
              title: 'card 2',
              description: 'description of card 2',
            },
          ],
        },
      ] as Section[],
    };
  },
});
</script>

<template>
  <v-container>
    <template v-for="section of sections">
      <SectionText :key="section.id" v-if="section.type === 'text'" :data="section.data" />
      <SectionCards :key="section.id" v-else-if="section.type === 'cards'" :data="section.data" />
      <SectionPokemons
        :key="section.id"
        v-else-if="section.type === 'pokemons'"
        :data="section.data"
      />
    </template>
  </v-container>
</template>
