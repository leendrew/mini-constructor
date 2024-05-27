<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import Draggable from 'vuedraggable';
import SectionBase from './SectionBase.vue';
import CardBase from '@/components/CardBase.vue';
import Stack from '@/components/ui/Stack.vue';
import type { SectionCardsData, GlobalState, SectionCards, ChangeDnDEvent } from '@/store';
import { generateNumberId } from '@/utils';

export default defineComponent({
  name: 'SectionCards',
  components: {
    SectionBase,
    Draggable,
    CardBase,
    Stack,
  },
  props: {
    data: {
      type: Array as PropType<SectionCardsData[]>,
      required: true,
    },
  },
  data() {
    return {
      cardsOnEditMod: {} as Record<string, SectionCardsData>,
      newCardId: generateNumberId(),
      icons: [
        {
          text: 'Bookmark',
          value: 'mdi-bookmark-outline',
        },
        {
          text: 'Alert',
          value: 'mdi-alert-circle-outline',
        },
        {
          text: 'Bucket',
          value: 'mdi-bucket-outline',
        },
        {
          text: 'Bullseye',
          value: 'mdi-bullseye',
        },
      ],
    };
  },
  computed: {
    isOnEditMod() {
      return (this.$store.state.global as GlobalState).isOnEditMod;
    },
    sectionsLength() {
      return this.$store.getters.sectionsLength;
    },
    isDragAllowed() {
      return this.isOnEditMod;
    },
    isHideHandle() {
      return !this.isOnEditMod || this.sectionsLength === 1;
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
  methods: {
    addCardToEditMod(card: SectionCardsData) {
      this.cardsOnEditMod = {
        ...this.cardsOnEditMod,
        [card.id]: { ...card },
      };
    },
    removeCardFromEditModById(id: number) {
      delete this.cardsOnEditMod[id];
      this.cardsOnEditMod = {
        ...this.cardsOnEditMod,
      };
    },
    checkIsCardOnEditMod(id: number) {
      return this.cardsOnEditMod[id] !== undefined;
    },
    updateCard(card: SectionCardsData) {
      if (!this.checkIsDataEmpty(card)) {
        return;
      }

      this.removeCardFromEditModById(card.id);
      this.$emit('updateData', card);
    },
    deleteCard(id: SectionCards['id']) {
      if (this.data.length <= 1) {
        this.deleteSection();
        return;
      }

      this.$emit('deleteDataById', id);
    },
    addCard(card: SectionCardsData) {
      if (!this.checkIsDataEmpty(card)) {
        return;
      }

      this.removeCardFromEditModById(card.id);

      const payload = [card];
      this.$emit('addData', payload);

      this.resetNewCardState();
    },
    resetState() {
      this.cardsOnEditMod = {};
      this.resetNewCardState();
    },
    resetNewCardState() {
      this.newCardId = generateNumberId();

      const payload: SectionCardsData = {
        id: this.newCardId,
        icon: '',
        title: '',
        description: '',
      };

      this.addCardToEditMod(payload);
    },
    deleteSection() {
      this.$emit('deleteSection');
    },
    checkIsDataEmpty(card: SectionCardsData) {
      return card.title && card.description && card.icon;
    },
    onChange(e: ChangeDnDEvent<SectionCardsData>) {
      if ('removed' in e) {
        const data = e.removed;
        this.deleteCard(data.element.id);
        return;
      }

      if ('moved' in e) {
        this.$emit('updateData', this.data);
        return;
      }
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
    <Draggable
      tag="div"
      group="cards"
      ghostClass="ghost"
      draggable=".draggable"
      handle=".handle"
      :scrollSensitivity="200"
      :list="data"
      :disabled="!isOnEditMod"
      forceFallback
      @move="() => isDragAllowed"
      @change="onChange"
    >
      <div class="grid">
        <template v-for="card of data">
          <CardBase
            :key="card.id"
            :class="{ draggable: isDragAllowed }"
          >
            <template v-if="isDragAllowed">
              <VIcon
                class="handle align-self-start"
                large
              >
                mdi-drag
              </VIcon>
            </template>
            <template v-if="!checkIsCardOnEditMod(card.id)">
              <VIcon
                class="icon"
                color="primary"
              >
                {{ card.icon }}
              </VIcon>
              <h4 class="ws-pw text-h5 pr-5">{{ card.title }}</h4>
              <p class="ws-pw text-body-1 mb-0 flex-grow-1">{{ card.description }}</p>
              <template v-if="isOnEditMod">
                <Stack :gap="3">
                  <VBtn
                    color="amber"
                    text
                    outlined
                    @click="addCardToEditMod(card)"
                  >
                    Edit
                  </VBtn>
                  <VBtn
                    color="red"
                    text
                    outlined
                    @click="deleteCard(card.id)"
                  >
                    Delete
                  </VBtn>
                </Stack>
              </template>
            </template>
            <template v-else>
              <VSelect
                v-model="cardsOnEditMod[card.id].icon"
                label="Icon"
                :items="icons"
                :prependInnerIcon="cardsOnEditMod[card.id].icon"
                outlined
                hideDetails
              >
                <template #item="{ item, props }">
                  <Stack :gap="3">
                    <VIcon
                      color="primary"
                      v-bind="props"
                    >
                      {{ item.value }}
                    </VIcon>
                    {{ item.text }}
                  </Stack>
                </template>
              </VSelect>
              <VTextField
                v-model.trim="cardsOnEditMod[card.id].title"
                label="Title"
                outlined
                hideDetails
              />
              <VTextarea
                v-model.trim="cardsOnEditMod[card.id].description"
                class="flex-grow-1"
                label="Description"
                :rows="3"
                outlined
                autoGrow
                hideDetails
              />
              <VBtn
                color="primary"
                :disabled="!checkIsDataEmpty(cardsOnEditMod[card.id])"
                text
                outlined
                @click="updateCard(cardsOnEditMod[card.id])"
              >
                Save
              </VBtn>
            </template>
          </CardBase>
        </template>
        <template v-if="isOnEditMod">
          <CardBase>
            <VSelect
              v-model="cardsOnEditMod[newCardId].icon"
              label="Icon"
              :items="icons"
              :prependInnerIcon="cardsOnEditMod[newCardId].icon"
              outlined
              hideDetails
            >
              <template #item="{ item, props }">
                <Stack :gap="3">
                  <VIcon
                    v-bind="props"
                    color="primary"
                  >
                    {{ item.value }}
                  </VIcon>
                  {{ item.text }}
                </Stack>
              </template>
            </VSelect>
            <VTextField
              v-model.trim="cardsOnEditMod[newCardId].title"
              label="Title"
              outlined
              hideDetails
            />
            <VTextarea
              v-model.trim="cardsOnEditMod[newCardId].description"
              class="flex-grow-1"
              label="Description"
              :rows="3"
              outlined
              autoGrow
              hideDetails
            />
            <VBtn
              color="primary"
              :disabled="!checkIsDataEmpty(cardsOnEditMod[newCardId])"
              text
              outlined
              @click="addCard(cardsOnEditMod[newCardId])"
            >
              Add New Card
            </VBtn>
          </CardBase>
        </template>
      </div>
    </Draggable>
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
