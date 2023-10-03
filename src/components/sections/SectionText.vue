<script lang="ts">
import { defineComponent, type PropType } from 'vue';
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
  <v-sheet class="mt-6 pa-6" rounded outlined tag="section">
    <template v-if="!isOnLocalEditMod && data.title && data.description">
      <h4 class="text-h4">{{ data.title }}</h4>
      <p class="text-body-1 mt-4 mb-0">{{ data.description }}</p>
    </template>
    <template v-else-if="isOnLocalEditMod">
      <v-text-field label="Title" v-model="title" outlined required />
      <v-textarea label="Description" v-model="description" outlined auto-grow rows="3" required />
    </template>
    <template v-if="isOnEditMod">
      <div class="mt-4">
        <template v-if="!isOnLocalEditMod">
          <v-btn color="amber" text outlined @click="toggleLocalEditMod">Edit</v-btn>
        </template>
        <template v-else>
          <v-btn color="primary" text outlined @click="updateData" :disabled="!checkIsEmpty()">
            Save
          </v-btn>
        </template>
      </div>
      <div class="mt-4">
        <v-btn color="red" text outlined @click="deleteSection">Delete Section</v-btn>
      </div>
    </template>
    <template v-if="!isOnEditMod && !data.title && !data.description">
      <p class="text-h5 text-center">This section is empty :( Turn on Edit mod and add content</p>
    </template>
  </v-sheet>
</template>
