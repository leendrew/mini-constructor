<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Stack from '@/components/ui/Stack.vue';

export default defineComponent({
  name: 'SectionBase',
  props: {
    hideHandle: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    hideAction: {
      type: Boolean as PropType<boolean>,
      default: true,
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
      <template v-if="!hideHandle">
        <v-icon class="handle align-self-start" large>mdi-drag</v-icon>
      </template>
      <slot />
      <template v-if="!hideAction">
        <v-btn class="align-self-start" color="red" text outlined @click="deleteSection">
          Delete Section
        </v-btn>
      </template>
    </Stack>
  </v-sheet>
</template>
