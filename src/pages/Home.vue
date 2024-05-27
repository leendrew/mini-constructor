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

const sectionComponentMap: Record<SectionTypes, Component> = {
  text: SectionText,
  cards: SectionCards,
  pokemons: SectionPokemons,
};

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
    isDragAllowed() {
      return this.isOnEditMod && this.sections.length !== 1;
    },
  },
  data() {
    return {
      sectionTypes: ['text', 'cards', 'pokemons'] as SectionTypes[],
      selectedSectionType: '',
    };
  },
  methods: {
    resetData() {
      this.selectedSectionType = '';
    },
    getSectionComponentByType(type: SectionTypes) {
      return sectionComponentMap[type];
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
  },
});
</script>

<template>
  <VContainer>
    <Stack
      direction="column"
      :gap="4"
    >
      <template v-if="!!sections.length">
        <Draggable
          v-model="sections"
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
          <Stack
            direction="column"
            :gap="4"
          >
            <template v-for="section of sections">
              <component
                :key="section.id"
                :is="getSectionComponentByType(section.type)"
                :class="{ draggable: isDragAllowed }"
                :data="section.data"
                @deleteSection="deleteSectionById(section.id)"
                @deleteDataById="deleteDataById({ sectionId: section.id, dataId: $event })"
                @addData="
                  addData({ sectionId: section.id, sectionType: section.type, data: $event })
                "
                @updateData="
                  updateData({ sectionId: section.id, sectionType: section.type, data: $event })
                "
              />
            </template>
          </Stack>
        </Draggable>
      </template>
      <template v-else-if="!isOnEditMod">
        <SectionBase>
          <p class="text-h5 text-center">
            This page is empty. Turn on Edit Mode and add sections (they will be saved after refresh
            page)
          </p>
        </SectionBase>
      </template>
      <template v-if="isOnEditMod">
        <SectionBase>
          <VSelect
            v-model="selectedSectionType"
            class="align-self-center"
            label="Section Type"
            :items="sectionTypes"
            outlined
            hideDetails
          />
          <VBtn
            class="align-self-center"
            color="primary"
            :disabled="!selectedSectionType"
            text
            outlined
            @click="addNewSection"
          >
            Add New Section
          </VBtn>
        </SectionBase>
      </template>
    </Stack>
  </VContainer>
</template>
