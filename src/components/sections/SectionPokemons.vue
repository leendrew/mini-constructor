<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Draggable from 'vuedraggable';
import SectionBase from './SectionBase.vue';
import { pokemonsApi } from '@/api';
import type { SectionPokemonsData, GlobalState, SectionPokemons, ChangeDnDEvent } from '@/store';
import { fetchPokemons } from '@/api/pokemons';
import CardBase from '../CardBase.vue';

export default defineComponent({
  name: 'SectionPokemons',
  components: {
    Draggable,
  },
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
    sectionsLength() {
      return this.$store.getters.sectionsLength;
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
      if (this.data.length <= 1) {
        this.deleteSection();
        return;
      }
      this.$emit('deleteDataById', id);
    },
    fetchPokemons() {
      pokemonsApi.fetchPokemons(this.limit, this.offset).then((res) => {
        this.$emit('addData', res);
        this.offset += this.limit;
      });
    },
    isDragAllowed() {
      return this.isOnEditMod && this.filteredPokemons.length === this.data.length;
    },
    onChange(e: ChangeDnDEvent<SectionPokemons>) {
      if ('removed' in e) {
        const data = e.removed;
        this.deletePokemon(data.element.id);
        return;
      }
      if ('moved' in e) {
        this.$emit('updateData', this.data);
        return;
      }
    },
  },
  beforeUpdate() {
    if (!!this.data.length) {
      this.offset = Math.max(...this.data.map((pokemon) => pokemon.id));
    }
  },
});
</script>

<template>
  <SectionBase
    @deleteSection="deleteSection"
    :hideHandle="!isOnEditMod || sectionsLength === 1"
    :hideAction="!isOnEditMod"
  >
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
      <Draggable
        class="grid"
        tag="div"
        group="pokemons"
        ghostClass="ghost"
        draggable=".draggable"
        handle=".handle"
        :forceFallback="true"
        :scrollSensitivity="200"
        :list="data"
        :disabled="!isOnEditMod"
        @move="isDragAllowed"
        @change="onChange"
      >
        <template v-for="pokemon of filteredPokemons">
          <CardBase
            :class="{ draggable: isOnEditMod && filteredPokemons.length === data.length }"
            :key="pokemon.id"
          >
            <template v-if="isOnEditMod && filteredPokemons.length === data.length">
              <v-icon class="handle align-self-start" large>mdi-drag</v-icon>
            </template>
            <v-img :src="pokemon.imageUrl" />
            <h4 class="text-h5">{{ pokemon.name }}</h4>
            <template v-if="isOnEditMod">
              <v-btn color="red" text outlined @click="deletePokemon(pokemon.id)"> Delete </v-btn>
            </template>
          </CardBase>
        </template>
      </Draggable>
    </template>
    <template v-else-if="!!data.length">
      <p class="text-h5 text-center">No search matches :(</p>
    </template>
    <template v-if="isOnEditMod">
      <v-btn class="align-self-start" color="primary" text outlined @click="fetchPokemons">
        Fetch More Pokemons
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
