<script lang="ts">
import { defineComponent } from 'vue';
import SectionText from '@/components/sections/SectionText.vue';
import SectionCards from '@/components/sections/SectionCards.vue';
import SectionPokemons from '@/components/sections/SectionPokemons.vue';
import type {
  GlobalState,
  SectionState,
  SectionId,
  AddCardPayload,
  DeleteDataPayload,
  UpdateSectionPayload,
} from '@/store';
export default defineComponent({
  name: 'Home',
  computed: {
    isOnEditMod() {
      return (this.$store.state.global as GlobalState).isOnEditMod;
    },
    sections() {
      return (this.$store.state.section as SectionState).sections;
    },
  },
  data() {
    return {
      sectionTypes: ['text', 'cards', 'pokemons'],
      selectedSectionType: '',
    };
  },
  methods: {
    resetData() {
      this.selectedSectionType = '';
    },
    addNewSection() {
      if (!this.selectedSectionType) {
        return;
      }
      this.$store.dispatch('addNewSection', this.selectedSectionType);
      this.resetData();
    },
    deleteSectionById(sectionId: SectionId) {
      this.$store.dispatch('deleteSectionById', sectionId);
    },
    addCard(payload: AddCardPayload) {
      this.$store.dispatch('addCard', payload);
    },
    deleteDataById(payload: DeleteDataPayload) {
      this.$store.dispatch('deleteDataById', payload);
    },
    updateSection(payload: UpdateSectionPayload) {
      this.$store.dispatch('updateSection', payload);
    },
  },
});
</script>

<template>
  <v-container>
    <template v-if="!!sections.length">
      <template v-for="section of sections">
        <SectionText
          :key="section.id"
          v-if="section.type === 'text'"
          :data="section.data"
          @deleteSection="deleteSectionById(section.id)"
          @updateData="
            (data) => updateSection({ sectionId: section.id, sectionType: section.type, data })
          "
        />
        <SectionCards
          :key="section.id"
          v-else-if="section.type === 'cards'"
          :data="section.data"
          @deleteSection="deleteSectionById(section.id)"
          @addCard="(card) => addCard({ sectionId: section.id, card })"
            @deleteCardById="(cardId) => deleteDataById({ sectionId: section.id, dataId: cardId })"
          @updateCardById="
            (card) =>
              updateSection({ sectionId: section.id, sectionType: section.type, data: card })
          "
        />
        <SectionPokemons
          :key="section.id"
          v-else-if="section.type === 'pokemons'"
          :data="section.data"
          @deleteSection="deleteSectionById(section.id)"
            @deletePokemonById="
              (pokemonId) => deleteDataById({ sectionId: section.id, dataId: pokemonId })
            "
            @updateData="
              (pokemons) =>
                updateSection({ sectionId: section.id, sectionType: section.type, data: pokemons })
            "
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
    <template v-if="isOnEditMod">
      <v-sheet class="mt-6 pa-6" rounded outlined tag="section">
        <v-select
          class="w-fc"
          label="Section Type"
          :items="sectionTypes"
          v-model="selectedSectionType"
          outlined
        />
        <v-btn
          color="primary"
          text
          outlined
          :disabled="!selectedSectionType"
          @click="addNewSection"
        >
          Add New Section
        </v-btn>
      </v-sheet>
    </template>
  </v-container>
</template>
