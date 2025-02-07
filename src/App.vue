<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main class="overflow-y-scroll">
      <div class="scroll-container"><router-view/></div>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {NavBar},

  data: () => ({
    //
  }),
}
</script>

<style>
html {
  overflow: hidden
}

main {
  max-height: 95vh
}

.scroll-container {
  height: 100%;
  overflow-y:scroll;
  backface-visibility:hidden
}
</style>
