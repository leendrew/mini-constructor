<script lang="ts">
import { defineComponent } from 'vue';
import Stack from '@/components/ui/Stack.vue';
import ModeToggler from '@/components/ModeToggler.vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    Stack,
    ModeToggler,
  },
});
</script>

<template>
  <VAppBar
    color="white"
    :elevation="1"
    app
  >
    <VContainer>
      <Stack justify="center">
        <ModeToggler />
      </Stack>
    </VContainer>
  </VAppBar>
</template>
