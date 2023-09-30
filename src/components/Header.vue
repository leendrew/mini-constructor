<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Header',
  computed: {
    isEditing: {
      get() {
        return this.$store.state.global.isEditing;
      },
      set() {
        this.$store.dispatch('toggleIsEditing');
      },
    },
  },
});
</script>

<template>
  <v-app-bar app color="white" elevation="0">
    <v-container>
      <v-row justify="center">
        <v-switch v-model="isEditing" :label="isEditing ? 'Edit mode' : 'View mode'" hide-details />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped></style>
