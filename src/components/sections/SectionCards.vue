<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { SectionCardsData, GlobalState } from '@/store';
import { generateNumberId } from '@/utils';
// TODO values validation
// TODO emits
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
  data() {
    return {
      cardsOnEditMod: {} as Record<string, SectionCardsData>,
      newCardId: generateNumberId(),
    };
  },
  methods: {
    addCardToEditMod(card: SectionCardsData) {
      this.cardsOnEditMod = { ...this.cardsOnEditMod, [card.id]: { ...card } };
    },
    removeCardFromEditModById(id: number) {
      delete this.cardsOnEditMod[id];
      this.cardsOnEditMod = { ...this.cardsOnEditMod };
    },
    checkIsCardOnEditMod(id: number) {
      return this.cardsOnEditMod[id] !== undefined;
    },
    updateCard(card: SectionCardsData) {
      this.removeCardFromEditModById(card.id);
      console.log('update Card', card);
      // this.$emit('update', card);
    },
    deleteCard(id: number) {
      console.log('delete Card', id);
      // this.$emit('delete', id);
    },
    addCard(card: SectionCardsData) {
      console.log('add Card', card);
      // this.$emit('add', card);
    },
    resetState() {
      this.cardsOnEditMod = {};
      this.newCardId = generateNumberId();
      this.addCardToEditMod({ id: this.newCardId, title: '', description: '' });
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
    <div class="grid">
      <template v-for="card of data">
        <v-card class="d-flex flex-column" rounded outlined tag="article">
          <template v-if="checkIsCardOnEditMod(card.id)">
            <v-card-title>
              <v-text-field label="Title" v-model="cardsOnEditMod[card.id].title" outlined />
              <v-textarea
                label="Description"
                v-model="cardsOnEditMod[card.id].description"
                outlined
                auto-grow
                rows="3"
                required
              />
            </v-card-title>
          </template>
          <template v-else>
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text> {{ card.description }}</v-card-text>
          </template>
          <template v-if="isOnEditMod && !checkIsCardOnEditMod(card.id)">
            <v-card-actions class="mt-auto">
              <v-btn color="amber" text outlined @click="addCardToEditMod(card)">Edit</v-btn>
              <v-btn color="red" text outlined @click="deleteCard(card.id)">Delete</v-btn>
            </v-card-actions>
          </template>
          <template v-else-if="isOnEditMod && checkIsCardOnEditMod(card.id)">
            <v-card-actions class="mt-auto">
              <v-btn
                color="primary"
                text
                outlined
                block
                @click="updateCard(cardsOnEditMod[card.id])"
                >Save</v-btn
              >
            </v-card-actions>
          </template>
        </v-card>
      </template>
      <template v-if="isOnEditMod">
        <v-card class="d-flex flex-column" rounded outlined tag="article">
          <v-card-title>
            <v-text-field
              label="Title"
              v-model="cardsOnEditMod[newCardId].title"
              outlined
              required
            />
            <v-textarea
              label="Description"
              v-model="cardsOnEditMod[newCardId].description"
              outlined
              auto-grow
              rows="3"
              required
            />
          </v-card-title>
          <v-card-actions class="mt-auto">
            <v-btn color="primary" text outlined block @click="addCard(cardsOnEditMod[newCardId])">
              Add New Card
            </v-btn>
          </v-card-actions>
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
