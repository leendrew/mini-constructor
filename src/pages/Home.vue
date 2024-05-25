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
      sectionTypes: ['text', 'cards', 'pokemons'],
      selectedSectionType: '',
    };
  },
  methods: {
    getSectionByType(type: SectionTypes) {
      const sectionsMap = {
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
            <component
              :is="getSectionByType(section.type)"
              :key="section.id"
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
