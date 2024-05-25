<script lang="ts">
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import Draggable from 'vuedraggable';
import Stack from '@/components/ui/Stack.vue';
import SectionBase from '@/components/sections/SectionBase.vue';
import SectionText from '@/components/sections/SectionText.vue';
import SectionCards from '@/components/sections/SectionCards.vue';
import SectionPokemons from '@/components/sections/SectionPokemons.vue';
import type {
  GlobalState,
  SectionState,
  SectionTypes,
  SectionId,
  DeleteDataPayload,
  UpdateDataPayload,
  AddDataPayload,
} from '@/store';

export default defineComponent({
  name: 'Home',
  components: {
    Stack,
    Draggable,
    SectionBase,
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
      sectionTypes: ['text', 'cards', 'pokemons'] as SectionTypes[],
      selectedSectionType: '',
    };
  },
  methods: {
    getSectionByType(type: SectionTypes) {
      const sectionsMap: Record<SectionTypes, Component> = {
        text: SectionText,
        cards: SectionCards,
        pokemons: SectionPokemons,
      };

      return sectionsMap[type];
    },
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
    deleteDataById(payload: DeleteDataPayload) {
      this.$store.dispatch('deleteDataById', payload);
    },
    addData(payload: AddDataPayload) {
      this.$store.dispatch('addData', payload);
    },
    updateData(payload: UpdateDataPayload) {
      this.$store.dispatch('updateData', payload);
    },
    isDragAllowed() {
      return this.isOnEditMod && this.sections.length !== 1;
    },
  },
});
</script>

<template>
  <v-container>
    <Stack
      direction="column"
      :gap="4"
    >
      <template v-if="!!sections.length">
        <Draggable
          v-model="sections"
          class="stack"
          tag="div"
          group="sections"
          ghostClass="ghost"
          draggable=".draggable"
          handle=".handle"
          :scrollSensitivity="200"
          :disabled="!isOnEditMod"
          forceFallback
          @move="() => isDragAllowed"
        >
          <template v-for="section of sections">
            <component
              :key="section.id"
              :is="getSectionByType(section.type)"
              :class="{ draggable: sections.length !== 1 }"
              :data="section.data"
              @deleteSection="deleteSectionById(section.id)"
              @deleteDataById="deleteDataById({ sectionId: section.id, dataId: $event })"
              @addData="addData({ sectionId: section.id, sectionType: section.type, data: $event })"
              @updateData="
                updateData({ sectionId: section.id, sectionType: section.type, data: $event })
              "
            />
          </template>
        </Draggable>
      </template>
      <template v-else-if="!isOnEditMod">
        <SectionBase>
          <p class="text-h5 text-center">
            This page is empty :( Turn on Edit mod and add sections (they will be saved after
            refresh page)
          </p>
        </SectionBase>
      </template>
      <template v-if="isOnEditMod">
        <SectionBase>
          <v-select
            v-model="selectedSectionType"
            class="align-self-center"
            label="Section Type"
            :items="sectionTypes"
            outlined
            hideDetails
          />
          <v-btn
            class="align-self-center"
            color="primary"
            :disabled="!selectedSectionType"
            text
            outlined
            @click="addNewSection"
          >
            Add New Section
          </v-btn>
        </SectionBase>
      </template>
    </Stack>
  </v-container>
</template>
