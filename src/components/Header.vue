<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Header',
  data() {
    return {
      isEditMod: false,
    };
  },
});
</script>

<template>
  <v-app-bar app>
    <v-container center>
      <v-switch v-model="isEditMod" :label="isEditMod ? 'Edit mode' : 'View mode'" hide-details />
    </v-container>
  </v-app-bar>
</template>

<style scoped></style>
