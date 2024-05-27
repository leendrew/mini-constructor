<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import Draggable from 'vuedraggable';
import SectionBase from './SectionBase.vue';
import CardBase from '@/components/CardBase.vue';
import { pokemonsApi } from '@/api';
import type { SectionPokemonsData, GlobalState, SectionPokemons, ChangeDnDEvent } from '@/store';

export default defineComponent({
  name: 'SectionPokemons',
  components: {
    SectionBase,
    Draggable,
    CardBase,
  },
  props: {
    data: {
      type: Array as PropType<SectionPokemonsData[]>,
      required: true,
    },
  },
  data() {
    return {
      limit: 5,
      offset: (this.data.length && this.data[this.data.length - 1].id) || 0,
      searchValue: '',
    };
  },
  computed: {
    isOnEditMod() {
      return (this.$store.state.global as GlobalState).isOnEditMod;
    },
    sectionsLength() {
      return this.$store.getters.sectionsLength;
    },
    filteredPokemons() {
      if (!!this.data.length && this.searchValue) {
        return this.data.filter((pokemon) => pokemon.name.includes(this.searchValue));
      }

      return this.data;
    },
    isDragAllowed() {
      return this.isOnEditMod && this.filteredPokemons.length === this.data.length;
    },
    isHideHandle() {
      return !this.isOnEditMod || this.sectionsLength === 1;
    },
  },
  beforeUpdate() {
    if (!!this.data.length) {
      this.offset = Math.max(...this.data.map((pokemon) => pokemon.id));
    }
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
      pokemonsApi.fetchPokemons(this.limit, this.offset).then((response) => {
        this.offset += this.limit;
        this.$emit('addData', response);
      });
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
});
</script>

<template>
  <SectionBase
    :hideHandle="isHideHandle"
    :hideAction="!isOnEditMod"
    @deleteSection="deleteSection"
  >
    <VTextField
      v-model.trim="searchValue"
      class="align-self-center"
      label="Name"
      placeholder="Filter by name..."
      outlined
      clearable
      hideDetails
    />
    <template v-if="!!filteredPokemons.length">
      <Draggable
        tag="div"
        class="grid"
        group="pokemons"
        ghostClass="ghost"
        draggable=".draggable"
        handle=".handle"
        :list="data"
        :scrollSensitivity="200"
        :disabled="!isOnEditMod"
        forceFallback
        @move="() => isDragAllowed"
        @change="onChange"
      >
        <template v-for="pokemon of filteredPokemons">
          <CardBase
            :key="pokemon.id"
            :class="{ draggable: isDragAllowed }"
          >
            <template v-if="isDragAllowed">
              <VIcon
                class="handle align-self-start"
                large
              >
                mdi-drag
              </VIcon>
            </template>
            <VImg :src="pokemon.imageUrl" />
            <h4 class="text-h5">{{ pokemon.name }}</h4>
            <template v-if="isOnEditMod">
              <VBtn
                color="red"
                text
                outlined
                @click="deletePokemon(pokemon.id)"
              >
                Delete
              </VBtn>
            </template>
          </CardBase>
        </template>
      </Draggable>
    </template>
    <template v-else-if="!!data.length">
      <p class="text-h5 text-center">No search matches :(</p>
    </template>
    <template v-if="isOnEditMod">
      <VBtn
        class="align-self-start"
        color="primary"
        text
        outlined
        @click="fetchPokemons"
      >
        Fetch More Pokemons
      </VBtn>
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
