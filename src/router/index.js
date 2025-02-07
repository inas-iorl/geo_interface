import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue";
import TestView from "@/views/TestView.vue";
import SingInView from "@/views/SingInView.vue";
import MapView from "@/views/MapView.vue";
import ElementsView from "@/views/ElementsView.vue";
import CulturesView from "@/views/CulturesView.vue";
import DataTypesView from "@/views/DataTypesView.vue";
import DataTypeCategoryView from "@/views/DataTypeCategoryView.vue";
import ElementView from "@/views/ElementView.vue";
import pinia from "@/store";
import {useAuthStore} from "@/store/auth";
import SingOutView from "@/views/SingOutView.vue";

const routes = [
  { path: '/', name: 'home', component: MainView, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
  { path: '/test', name: 'Test', component: TestView, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
  { path: '/signin', name: 'SignIn', component: SingInView },
  { path: '/signout', name: 'SignOut', component: SingOutView },
  { path: '/map', name: 'Map', component: MapView, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
  { path: '/elements', name: 'Elements', component: ElementsView, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
  { path: '/element/:element_id/data', name: 'ElementData', component: ElementView, props: true, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
  { path: '/cultures', name: 'Cultures', component: CulturesView, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
  { path: '/data_types', name: 'data_types', component: DataTypesView, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
  { path: '/data_type_category', name: 'DataTypeCategory', component: DataTypeCategoryView, meta: { requiresAuth: true, roles: ['phd', 'admin'] } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const authStore = useAuthStore(pinia)

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authStore.isLoggedIn) {
      next();
      // return;
      // if (to.meta.roles.some((record) => record === authStore.getters.StateUser)){
      //   next()
      //   return;
      // } else {
      //   next(from.path);
      // }
    }
    else {
      next("/signin");
    }
  } else {
    next();
  }
});

export default router
