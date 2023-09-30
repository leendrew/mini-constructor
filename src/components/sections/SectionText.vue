<script lang="ts">
import { defineComponent, type PropType } from 'vue';
interface TextData {
  title: string;
  description: string;
}
export default defineComponent({
  name: 'SectionText',
  props: {
    data: {
      type: Object as PropType<TextData>,
      required: true,
    },
  },
});
</script>

<template>
  <v-sheet class="mt-6 pa-6" rounded outlined tag="section">
    <p class="text-h3">{{ data.title }}</p>
    <p class="text-body-1">{{ data.description }}</p>
  </v-sheet>
</template>

<style scoped></style>
