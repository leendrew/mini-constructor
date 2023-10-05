<script lang="ts">
import { defineComponent } from 'vue';
import Draggable from 'vuedraggable';
import Stack from '@/components/ui/Stack.vue';
import SectionBase from '@/components/sections/SectionBase.vue';
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
  UpdateAllPokemonsPayload,
} from '@/store';
export default defineComponent({
  name: 'Home',
  components: {
    Draggable,
  },
  computed: {
    isOnEditMod() {
      return (this.$store.state.global as GlobalState).isOnEditMod;
    },
    sections: {
      get() {
        return (this.$store.state.section as SectionState).sections;
      },
      set(updatedSections: SectionState) {
        this.$store.dispatch('updateAllSections', updatedSections);
      },
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
    updateAllCards(payload: any) {
      this.$store.dispatch('updateAllCards', payload);
    },
    deleteDataById(payload: DeleteDataPayload) {
      this.$store.dispatch('deleteDataById', payload);
    },
    updateSection(payload: UpdateSectionPayload) {
      this.$store.dispatch('updateSection', payload);
    },
    updateAllPokemons(payload: UpdateAllPokemonsPayload) {
      this.$store.dispatch('updateAllPokemons', payload);
    },
    isDragAllowed() {
      return this.isOnEditMod && this.sections.length !== 1;
    },
  },
});
</script>

<template>
  <v-container>
    <Stack direction="column" :gap="4">
      <template v-if="!!sections.length">
        <Draggable
          class="stack"
          tag="div"
          group="sections"
          ghostClass="ghost"
          draggable=".draggable"
          handle=".handle"
          :forceFallback="true"
          :scrollSensitivity="200"
          v-model="sections"
          :disabled="!isOnEditMod"
          :move="isDragAllowed"
        >
          <template v-for="section of sections">
            <SectionText
              v-if="section.type === 'text'"
              :class="{ draggable: sections.length !== 1 }"
              :key="section.id"
              :data="section.data"
              @deleteSection="deleteSectionById(section.id)"
              @updateData="
                (data) => updateSection({ sectionId: section.id, sectionType: section.type, data })
              "
            />
            <SectionCards
              v-else-if="section.type === 'cards'"
              :class="{ draggable: sections.length !== 1 }"
              :key="section.id"
              :data="section.data"
              @deleteSection="deleteSectionById(section.id)"
              @addCard="(card) => addCard({ sectionId: section.id, card })"
              @deleteCardById="
                (cardId) => deleteDataById({ sectionId: section.id, dataId: cardId })
              "
              @updateCardById="
                (card) =>
                  updateSection({
                    sectionId: section.id,
                    sectionType: section.type,
                    data: card,
                  })
              "
              @updateAllCards="(cards) => updateAllCards({ sectionId: section.id, data: cards })"
            />
            <SectionPokemons
              v-else-if="section.type === 'pokemons'"
              :class="{ draggable: sections.length !== 1 }"
              :key="section.id"
              :data="section.data"
              @deleteSection="deleteSectionById(section.id)"
              @deletePokemonById="
                (pokemonId) => deleteDataById({ sectionId: section.id, dataId: pokemonId })
              "
              @updateData="
                (pokemons) =>
                  updateSection({
                    sectionId: section.id,
                    sectionType: section.type,
                    data: pokemons,
                  })
              "
              @updateAllPokemons="
                (pokemons) => updateAllPokemons({ sectionId: section.id, data: pokemons })
              "
            />
          </template>
        </Draggable>
      </template>
      <template v-else-if="!isOnEditMod">
        <SectionBase withoutDelete>
          <p class="text-h5 text-center">
            This page is empty :( Turn on Edit mod and add sections (they will be saved after
            refresh page)
          </p>
        </SectionBase>
      </template>
      <template v-if="isOnEditMod">
        <SectionBase withoutDelete>
          <v-select
            class="align-self-center"
            label="Section Type"
            outlined
            hide-details
            v-model="selectedSectionType"
            :items="sectionTypes"
          />
          <v-btn
            class="align-self-center"
            color="primary"
            text
            outlined
            :disabled="!selectedSectionType"
            @click="addNewSection"
          >
            Add New Section
          </v-btn>
        </SectionBase>
      </template>
    </Stack>
  </v-container>
</template>
