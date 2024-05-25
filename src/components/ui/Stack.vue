<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType, Component } from 'vue';

export default defineComponent({
  name: 'Stack',
  props: {
    as: {
      type: [String, Object] as PropType<string | Component>,
      default: 'div',
    },
    direction: {
      type: String as PropType<'row' | 'row-reverse' | 'column' | 'column-reverse'>,
      default: 'row',
    },
    gap: {
      type: Number as PropType<number>,
      default: 0,
    },
    justify: {
      type: String as PropType<
        'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
      >,
      default: 'flex-start',
    },
    align: {
      type: String as PropType<'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'>,
      default: 'stretch',
    },
  },
  data() {
    return {
      styles: {
        display: 'flex',
        flexDirection: this.direction,
        gap: `${this.gap * 4}px`,
        justifyContent: this.justify,
        alignItems: this.align,
      },
    };
  },
});
</script>

<template>
  <component
    :is="as"
    :style="styles"
  >
    <slot />
  </component>
</template>
