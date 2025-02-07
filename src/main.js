import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { createPinia } from 'pinia'
import axios from 'axios'
import VueCookies from 'vue-cookies'

import 'leaflet/dist/leaflet.css';
import 'vue-map-ui/dist/normalize.css';
import 'vue-map-ui/dist/style.css';
import 'vue-map-ui/dist/theme-all.css'

loadFonts()

const app = createApp(App)

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://192.168.10.59:8020';
axios.defaults.baseURL = 'https://cabinet.btcom.kz/co2/api';
// axios.defaults.xsrfCookieName = 'fastapi-csrf-token';
axios.defaults.xsrfCookieName = 'X-CSRFToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.AccessControlAllowCredentials = true;

app.use(createPinia())
app.use(store)
app.use(router)
app.use(VueCookies)
app.use(vuetify)
router.isReady().then(() => {
    app.mount('#app')
})
// app.mount('#app')


// createApp(App)
//   .use(store)
//   .use(router)
//   .use(vuetify)
//   .mount('#app')
