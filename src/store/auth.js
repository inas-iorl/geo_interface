// import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.getItem('token', '')}`}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: null,
    email: null,
    name: null,
    authToken: localStorage.getItem('token', '')
  }),
  getters: {
    token: (state) => state.authToken ? state.authToken : '',
    isLoggedIn(){return this.token.length > 10},
  },
  actions: {
    async signIn(user){
      await axios.post('/auth/', user).then((response) => {
        console.log(response)
      if (response.data.access_token){
        // success
        axios.defaults.headers.common = {'Authorization': `bearer ${response.data.access_token}`}
        localStorage.setItem('token', response.data.access_token)
        this.authToken = response.data.access_token
        this.username = response.data.username
      }
      else {
        console.log('failure')
      }
      })
    },
    async signOut(){
      await axios.get('/signout').then((response) => {
        if (response.status === 200){
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
          this.authToken = ''
          this.username = null
        }
      })
    }
  },
  mutations: () => {},
})
