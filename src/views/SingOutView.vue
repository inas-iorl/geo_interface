<script setup>
import {onBeforeMount} from "vue";
import {useAuthStore} from "@/store/auth";
import {useRouter} from "vue-router";

onBeforeMount(async () => {
  const authStore = useAuthStore();
  const router = useRouter();

  authStore.signOut()
  router.push('/signin')
})
</script>

<template>
<div></div>
</template>

<style scoped>

</style>