<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { GlobalState } from '@/store';
import Stack from '@/components/ui/Stack.vue';
export default defineComponent({
  name: 'SectionBase',
  props: {
    withoutDelete: {
      type: Boolean as PropType<boolean>,
      default: false,
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
  methods: {
    deleteSection() {
      this.$emit('deleteSection');
    },
  },
});
</script>

<template>
  <v-sheet class="pa-6" tag="section" rounded outlined>
    <Stack direction="column" :gap="4">
      <template v-if="!withoutDelete && isOnEditMod && sectionsLength > 1">
        <v-icon class="handle align-self-start" large>mdi-drag</v-icon>
      </template>
      <slot />
      <template v-if="!withoutDelete && isOnEditMod">
        <v-btn class="align-self-start" color="red" text outlined @click="deleteSection">
          Delete Section
        </v-btn>
      </template>
    </Stack>
  </v-sheet>
</template>
