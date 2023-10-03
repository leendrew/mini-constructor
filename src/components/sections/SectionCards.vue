<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import SectionBase from './SectionBase.vue';
import type { SectionCardsData, GlobalState, SectionCards } from '@/store';
import { generateNumberId } from '@/utils';
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
      if (!this.checkIsDataEmpty(card)) {
        return;
      }
      this.removeCardFromEditModById(card.id);
      this.$emit('updateCardById', card);
    },
    deleteCard(id: SectionCards['id']) {
      if (this.data.length === 1) {
        return;
      }
      this.$emit('deleteCardById', id);
    },
    addCard(card: SectionCardsData) {
      if (!this.checkIsDataEmpty(card)) {
        return;
      }
      this.removeCardFromEditModById(card.id);
      this.$emit('addCard', card);
      this.resetNewCardState();
    },
    resetState() {
      this.cardsOnEditMod = {};
      this.resetNewCardState();
    },
    resetNewCardState() {
      this.newCardId = generateNumberId();
      this.addCardToEditMod({ id: this.newCardId, title: '', description: '' });
    },
    deleteSection() {
      this.$emit('deleteSection');
    },
    checkIsDataEmpty(card: SectionCardsData) {
      return card.title && card.description;
    },
  },
  watch: {
    isOnEditMod() {
      this.resetState();
    },
  },
  beforeMount() {
    this.resetState();
  },
});
</script>

<template>
  <SectionBase>
    <div class="grid">
      <template v-for="card of data">
        <v-card :key="card.id" class="d-flex flex-column" rounded outlined tag="article">
          <template v-if="!checkIsCardOnEditMod(card.id)">
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text> {{ card.description }}</v-card-text>
          </template>
          <template v-else>
            <v-card-title>
              <v-text-field
                label="Title"
                v-model="cardsOnEditMod[card.id].title"
                outlined
                hide-details
              />
              <v-textarea
                class="mt-4"
                label="Description"
                v-model="cardsOnEditMod[card.id].description"
                outlined
                auto-grow
                rows="3"
                hide-details
              />
            </v-card-title>
          </template>
          <template v-if="isOnEditMod && !checkIsCardOnEditMod(card.id)">
            <v-card-actions class="mt-auto">
              <v-btn color="amber" text outlined @click="addCardToEditMod(card)">Edit</v-btn>
              <v-btn
                color="red"
                text
                outlined
                @click="deleteCard(card.id)"
                :disabled="data.length === 1"
              >
                Delete
              </v-btn>
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
                :disabled="!checkIsDataEmpty(cardsOnEditMod[card.id])"
              >
                Save
              </v-btn>
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
              hide-details
            />
            <v-textarea
              class="mt-4"
              label="Description"
              v-model="cardsOnEditMod[newCardId].description"
              outlined
              auto-grow
              rows="3"
              hide-details
            />
          </v-card-title>
          <v-card-actions class="mt-auto">
            <v-btn
              color="primary"
              text
              outlined
              block
              @click="addCard(cardsOnEditMod[newCardId])"
              :disabled="!checkIsDataEmpty(cardsOnEditMod[newCardId])"
            >
              Add New Card
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </div>
    <template v-if="isOnEditMod">
      <v-btn class="align-self-start" color="red" text outlined @click="deleteSection">
        Delete Section
      </v-btn>
    </template>
  </SectionBase>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 310px), 1fr));
  gap: 16px;
}
</style>
