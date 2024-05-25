<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import SectionBase from './SectionBase.vue';
import type { SectionTextData, GlobalState } from '@/store';

export default defineComponent({
  name: 'SectionText',
  components: {
    SectionBase,
  },
  props: {
    data: {
      type: Object as PropType<SectionTextData>,
      required: true,
    },
  },
  data() {
    return {
      isOnLocalEditMod: false,
      title: this.data.title,
      description: this.data.description,
    };
  },
  computed: {
    isOnEditMod() {
      return (this.$store.state.global as GlobalState).isOnEditMod;
    },
    sectionsLength() {
      return this.$store.getters.sectionsLength;
    },
    isEmpty() {
      return this.title && this.description;
    },
    isHideHandle() {
      return !this.isOnEditMod || this.sectionsLength === 1;
    },
  },
  methods: {
    toggleLocalEditMod() {
      this.isOnLocalEditMod = !this.isOnLocalEditMod;
    },
    updateData() {
      if (!this.isEmpty) {
        return;
      }

      const payload = {
        title: this.title,
        description: this.description,
      };

      this.$emit('updateData', payload);
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
  },
  watch: {
    isOnEditMod() {
      this.resetState();
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
    <template v-if="!isOnLocalEditMod">
      <h4 class="ws-pw text-h4">{{ data.title }}</h4>
      <p class="ws-pw text-body-1 mb-0">{{ data.description }}</p>
      <template v-if="isOnEditMod">
        <v-btn
          class="align-self-start"
          color="amber"
          text
          outlined
          @click="toggleLocalEditMod"
        >
          Edit
        </v-btn>
      </template>
    </template>
    <template v-else>
      <v-text-field
        v-model.trim="title"
        label="Title"
        outlined
        hideDetails
      />
      <v-textarea
        v-model.trim="description"
        label="Description"
        :rows="3"
        outlined
        autoGrow
        hideDetails
      />
      <v-btn
        class="align-self-start"
        color="primary"
        :disabled="!isEmpty"
        text
        outlined
        @click="updateData"
      >
        Save
      </v-btn>
    </template>
  </SectionBase>
</template>
