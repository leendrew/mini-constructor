<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import SectionBase from './SectionBase.vue';
import { pokemonsApi } from '@/api';
import type { SectionPokemonsData, GlobalState, SectionPokemons } from '@/store';
import { fetchPokemons } from '@/api/pokemons';
import CardBase from '../CardBase.vue';
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
    filteredPokemons(): SectionPokemonsData[] {
      return !!this.data.length && this.searchValue
        ? this.data.filter((pokemon) => pokemon.name.includes(this.searchValue))
        : this.data;
    },
  },
  data() {
    return {
      limit: 5,
      offset: (this.data.length && this.data[this.data.length - 1].id) || 0,
      searchValue: '',
    };
  },
  methods: {
    deleteSection() {
      this.$emit('deleteSection');
    },
    deletePokemon(id: SectionPokemons['id']) {
      this.$emit('deletePokemonById', id);
    },
    fetchPokemons() {
      pokemonsApi.fetchPokemons(this.limit, this.offset).then((res) => {
        this.$emit('updateData', res);
        this.offset += this.limit;
      });
    },
  },
  beforeUpdate() {
    if (!!this.data.length) {
      this.offset = this.data[this.data.length - 1].id;
    }
  },
});
</script>

<template>
  <SectionBase>
    <v-text-field
      class="align-self-center"
      outlined
      label="Name"
      placeholder="Filter by name..."
      hide-details
      clearable
      v-model.trim="searchValue"
    />
    <template v-if="!!filteredPokemons.length">
      <div class="grid">
        <template v-for="pokemon of filteredPokemons">
          <CardBase :key="pokemon.id">
            <v-img :src="pokemon.imageUrl" />
            <h4 class="text-h5">{{ pokemon.name }}</h4>
            <template v-if="isOnEditMod">
              <v-btn color="red" text outlined @click="deletePokemon(pokemon.id)">Delete</v-btn>
            </template>
          </CardBase>
        </template>
      </div>
    </template>
    <template v-else-if="!!data.length">
      <p class="text-h5 text-center">No search matches :(</p>
    </template>
    <template v-if="isOnEditMod">
      <v-btn class="align-self-start" color="primary" text outlined @click="fetchPokemons">
        Fetch More Pokemons
      </v-btn>
      <v-btn class="align-self-start" color="red" text outlined @click="deleteSection">
        Delete Section
      </v-btn>
    </template>
  </SectionBase>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 310px), 1fr));
  gap: 16px;
}
</style>
