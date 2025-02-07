<script setup>
import {useAuthStore} from "@/store/auth";
import pinia from "@/store";

const authStore = useAuthStore(pinia)

</script>

<template>
      <v-navigation-drawer expand-on-hover rail v-if="authStore.isLoggedIn">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-map" title="Map" value="starred" to="/map"></v-list-item>
          <v-list-item prepend-icon="mdi-ab-testing" title="Test" value="starred" to="/test"></v-list-item>
          <v-list-item prepend-icon="mdi-location-exit" title="Logout" value="starred" to="/signout" v-if="authStore.isLoggedIn"></v-list-item>
          <v-list-item prepend-icon="mdi-location-enter" title="Login" value="starred" to="/signin" v-else></v-list-item>
          <v-list-item prepend-icon="mdi-island" title="Elements" value="starred" to="/elements"></v-list-item>
          <v-list-item prepend-icon="mdi-fruit-cherries" title="Cultures" value="starred" to="/cultures"></v-list-item>
          <v-list-item prepend-icon="mdi-shape" title="Data type" value="starred" to="/data_types"></v-list-item>
          <v-list-item prepend-icon="mdi-shape-plus" title="Type category" value="starred" to="/data_type_category"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<style scoped>

</style>