<script setup>
import {defineProps, ref} from 'vue'

  const props = defineProps(['names'])
  const names = ref(props.names)

</script>

<template>
  <v-container>
    <v-text-field v-model="names.rus" label="Rus"></v-text-field>
    <v-text-field v-model="names.kaz" label="Kaz"></v-text-field>
    <v-text-field v-model="names.eng" label="Eng"></v-text-field>
  </v-container>
</template>

<style scoped>

</style>