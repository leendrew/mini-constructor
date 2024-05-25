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
  <v-app-bar
    color="white"
    :elevation="1"
    app
  >
    <v-container>
      <Stack justify="center">
        <ModeToggler />
      </Stack>
    </v-container>
  </v-app-bar>
</template>
