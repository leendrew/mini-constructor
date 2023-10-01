<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { SectionCardsData, GlobalState } from '@/store';
export default defineComponent({
  name: 'SectionCards',
  props: {
    data: {
      type: Array as PropType<SectionCardsData[]>,
      required: true,
    },
  },
  computed: {
    isOnEditMod() {
      return (this.$store.state.global as GlobalState).isOnEditMod;
    },
  },
    },
  },
});
</script>

<template>
  <v-sheet class="mt-6 pa-6" rounded outlined tag="section">
    <div class="grid">
      <template v-for="card of data">
        <v-card rounded outlined tag="article">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-text> {{ card.description }}</v-card-text>
        </v-card>
      </template>
    </div>
  </v-sheet>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr));
  gap: 16px;
}
</style>
