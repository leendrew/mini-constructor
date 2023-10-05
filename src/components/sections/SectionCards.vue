<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Draggable from 'vuedraggable';
import SectionBase from './SectionBase.vue';
import CardBase from '@/components/CardBase.vue';
import type { SectionCardsData, GlobalState, SectionCards, ChangeDnDEvent } from '@/store';
import { generateNumberId } from '@/utils';
export default defineComponent({
  name: 'SectionCards',
  components: {
    Draggable,
  },
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
    sectionsLength() {
      return this.$store.getters.sectionsLength;
    },
  },
  data() {
    return {
      cardsOnEditMod: {} as Record<string, SectionCardsData>,
      newCardId: generateNumberId(),
      icons: [
        { text: 'Bookmark', value: 'mdi-bookmark-outline' },
        { text: 'Alert', value: 'mdi-alert-circle-outline' },
        { text: 'Bucket', value: 'mdi-bucket-outline' },
        { text: 'Bullseye', value: 'mdi-bullseye' },
      ],
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
      if (this.data.length === 0) {
        this.deleteSection();
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
      this.addCardToEditMod({ id: this.newCardId, icon: '', title: '', description: '' });
    },
    deleteSection() {
      this.$emit('deleteSection');
    },
    checkIsDataEmpty(card: SectionCardsData) {
      return card.title && card.description && card.icon;
    },
    isDragAllowed() {
      return this.isOnEditMod;
    },
    onChange(e: ChangeDnDEvent<SectionCardsData>) {
      if ('removed' in e) {
        const data = e.removed;
        this.deleteCard(data.element.id);
        return;
      }
      if ('moved' in e) {
        this.$emit('updateAllCards', this.data);
        return;
      }
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
    <template v-if="isOnEditMod && sectionsLength > 1">
      <v-icon class="handle align-self-start" large>mdi-drag</v-icon>
    </template>
    <Draggable
      class="grid"
      tag="div"
      group="cards"
      ghostClass="ghost"
      draggable=".draggable"
      handle=".handle"
      :forceFallback="true"
      :scrollSensitivity="200"
      :list="data"
      :disabled="!isOnEditMod"
      @move="isDragAllowed"
      @change="onChange"
    >
      <template v-for="card of data">
        <CardBase :class="{ draggable: isOnEditMod }" :key="card.id">
          <template v-if="isOnEditMod">
            <v-icon class="handle align-self-start" large>mdi-drag</v-icon>
          </template>
          <template v-if="!checkIsCardOnEditMod(card.id)">
            <v-icon class="icon" color="primary">{{ card.icon }}</v-icon>
            <h4 class="ws-pw text-h5 pr-5">{{ card.title }}</h4>
            <p class="ws-pw text-body-1 mb-0 flex-grow-1">{{ card.description }}</p>
            <template v-if="isOnEditMod">
              <Stack :gap="3">
                <v-btn color="amber" text outlined @click="addCardToEditMod(card)">Edit</v-btn>
                <v-btn color="red" text outlined @click="deleteCard(card.id)"> Delete </v-btn>
              </Stack>
            </template>
          </template>
          <template v-else>
            <v-select
              label="Icon"
              outlined
              hide-details
              :items="icons"
              :prepend-inner-icon="cardsOnEditMod[card.id].icon"
              v-model="cardsOnEditMod[card.id].icon"
            >
              <template v-slot:item="{ item, props }">
                <Stack :gap="3">
                  <v-icon color="primary" v-bind="props">{{ item.value }} </v-icon>
                  {{ item.text }}
                </Stack>
              </template>
            </v-select>
            <v-text-field
              label="Title"
              v-model.trim="cardsOnEditMod[card.id].title"
              outlined
              hide-details
            />
            <v-textarea
              class="flex-grow-1"
              label="Description"
              v-model.trim="cardsOnEditMod[card.id].description"
              outlined
              auto-grow
              rows="3"
              hide-details
            />
            <v-btn
              color="primary"
              text
              outlined
              @click="updateCard(cardsOnEditMod[card.id])"
              :disabled="!checkIsDataEmpty(cardsOnEditMod[card.id])"
            >
              Save
            </v-btn>
          </template>
        </CardBase>
      </template>
      <template v-if="isOnEditMod">
        <CardBase>
          <v-select
            label="Icon"
            outlined
            hide-details
            v-model="cardsOnEditMod[newCardId].icon"
            :items="icons"
            :prepend-inner-icon="cardsOnEditMod[newCardId].icon"
          >
            <template v-slot:item="{ item, props }">
              <Stack :gap="3">
                <v-icon color="primary" v-bind="props">{{ item.value }} </v-icon>
                {{ item.text }}
              </Stack>
            </template>
          </v-select>
          <v-text-field
            label="Title"
            v-model.trim="cardsOnEditMod[newCardId].title"
            outlined
            hide-details
          />
          <v-textarea
            class="flex-grow-1"
            label="Description"
            v-model.trim="cardsOnEditMod[newCardId].description"
            outlined
            auto-grow
            rows="3"
            hide-details
          />
          <v-btn
            color="primary"
            text
            outlined
            @click="addCard(cardsOnEditMod[newCardId])"
            :disabled="!checkIsDataEmpty(cardsOnEditMod[newCardId])"
          >
            Add New Card
          </v-btn>
        </CardBase>
      </template>
    </Draggable>
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
.icon {
  position: absolute;
  right: 8px;
  top: 8px;
}
</style>
