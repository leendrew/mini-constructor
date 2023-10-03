<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import SectionBase from './SectionBase.vue';
import { pokemonsApi } from '@/api';
import type { SectionPokemonsData, GlobalState, SectionPokemons } from '@/store';
import { fetchPokemons } from '@/api/pokemons';
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
      return this.searchValue
        ? this.data.filter((pokemon) => pokemon.name.includes(this.searchValue))
        : this.data;
    },
  },
  data() {
    return {
      limit: 5,
      offset: (!!this.data.length && this.data[this.data.length - 1].id) || 0,
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
});
</script>

<template>
  <SectionBase>
    <v-text-field
      class="w-fc align-self-center"
      outlined
      label="Name"
      placeholder="Filter by name..."
      hide-details
      v-model="searchValue"
    />
    <template v-if="!!filteredPokemons.length">
      <div class="grid">
        <template v-for="pokemon of filteredPokemons">
          <v-card :key="pokemon.id" class="d-flex flex-column" rounded outlined tag="article">
            <v-img :src="pokemon.imageUrl" />
            <v-card-title>{{ pokemon.name }}</v-card-title>
            <template v-if="isOnEditMod">
              <v-card-actions class="mt-auto">
                <v-btn color="red" text outlined block @click="deletePokemon(pokemon.id)">
                  Delete
                </v-btn>
              </v-card-actions>
            </template>
          </v-card>
        </template>
      </div>
    </template>
    <template v-else>
      <p class="text-h5 text-center">No match results :(</p>
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
