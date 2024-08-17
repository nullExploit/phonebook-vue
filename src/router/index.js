import { createRouter, createWebHistory } from "vue-router";
import ErrorView from "@/views/ErrorView.vue";
import PhoneBookView from "@/views/PhoneBookView.vue";
import PhoneBookAddView from "@/views/PhoneBookAddView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PhoneBookView,
    },
    {
      path: "/add",
      name: "add",
      component: PhoneBookAddView,
    },
    { path: "/:pathMatch(.*)*", component: ErrorView },
  ],
});

export default router;
