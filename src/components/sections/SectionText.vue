<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import SectionBase from './SectionBase.vue';
import type { SectionTextData, GlobalState } from '@/store';
export default defineComponent({
  name: 'SectionText',
  props: {
    data: {
      type: Object as PropType<SectionTextData>,
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
  },
  data() {
    return {
      isOnLocalEditMod: false,
      title: this.data.title,
      description: this.data.description,
    };
  },
  methods: {
    toggleLocalEditMod() {
      this.isOnLocalEditMod = !this.isOnLocalEditMod;
    },
    updateData() {
      if (!this.checkIsEmpty()) {
        return;
      }
      this.$emit('updateData', { title: this.title, description: this.description });
      this.isOnLocalEditMod = false;
    },
    resetState() {
      this.isOnLocalEditMod = false;
      this.title = this.data.title;
      this.description = this.data.description;
    },
    deleteSection() {
      this.$emit('deleteSection');
    },
    checkIsEmpty() {
      return this.title && this.description;
    },
  },
  watch: {
    isOnEditMod() {
      this.resetState();
    },
  },
});
</script>

<template>
  <SectionBase @deleteSection="deleteSection">
    <template v-if="!isOnLocalEditMod">
      <h4 class="ws-pw text-h4">{{ data.title }}</h4>
      <p class="ws-pw text-body-1 mb-0">{{ data.description }}</p>
      <template v-if="isOnEditMod">
        <v-btn class="align-self-start" color="amber" text outlined @click="toggleLocalEditMod">
          Edit
        </v-btn>
      </template>
    </template>
    <template v-else>
      <v-text-field label="Title" v-model.trim="title" outlined hide-details />
      <v-textarea
        label="Description"
        v-model.trim="description"
        outlined
        hide-details
        auto-grow
        rows="3"
      />
      <v-btn
        class="align-self-start"
        color="primary"
        text
        outlined
        @click="updateData"
        :disabled="!checkIsEmpty()"
      >
        Save
      </v-btn>
    </template>
  </SectionBase>
</template>
