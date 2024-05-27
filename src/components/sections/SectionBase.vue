<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import Stack from '@/components/ui/Stack.vue';

export default defineComponent({
  name: 'SectionBase',
  components: {
    Stack,
  },
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
  <VSheet
    tag="section"
    class="pa-6"
    rounded
    outlined
  >
    <Stack
      direction="column"
      :gap="4"
    >
      <template v-if="!hideHandle">
        <VIcon
          class="handle align-self-start"
          large
        >
          mdi-drag
        </VIcon>
      </template>
      <slot />
      <template v-if="!hideAction">
        <VBtn
          class="align-self-start"
          color="red"
          text
          outlined
          @click="deleteSection"
        >
          Delete Section
        </VBtn>
      </template>
    </Stack>
  </VSheet>
</template>
