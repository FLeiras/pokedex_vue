import { createRouter, createWebHistory } from "vue-router";

import Landing from "../pages/LandingView.vue";
import Home from "../pages/HomePage.vue";
import PokeDetail from "../components/PokeDetail.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: "/landing",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokemon/:id",
    name: "Detail",
    component: PokeDetail,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
