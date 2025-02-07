<script setup>

import {reactive, ref} from "vue";
import {useAuthStore} from "@/store/auth";
import router from "@/router";

const authStore = useAuthStore()

// const router = useRouter()

const form = reactive({
  'username': '',
  'password': '',
})

const loading = ref(false)

const auth = async () => {
  const user = new FormData();
  user.append('username', form.username);
  user.append('password', form.password);
  loading.value = true
  await authStore.signIn(user)
  loading.value = false
  if (authStore.isLoggedIn){
    router.push('/elements')
  }
}

</script>

<template>
  <v-sheet class="mx-auto d-flex align-center justify-center" height="95vh">
    <v-form>
      <v-container width="300px">
        <v-row><v-col><v-text-field v-model="form.username" label="Username" required></v-text-field></v-col></v-row>
        <v-row><v-col><v-text-field v-model="form.password" label="Password" type="password" required></v-text-field></v-col></v-row>
        <v-row><v-col><v-btn @click="auth">Войти</v-btn></v-col></v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>