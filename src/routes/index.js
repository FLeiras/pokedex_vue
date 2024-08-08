import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/HomePage.vue";
import Landing from "../pages/LandingView.vue";
import NotFound from "../components/NotFound.vue";
import PokeDetail from "../components/PokeDetail.vue";

const routes = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: "/landing",
    name: "Landing",
    component: Landing,
    meta: { title: "Pokedex" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/pokemon/:id",
    name: "PokemonDetail",
    component: PokeDetail,
    props: true,
    meta: { title: "Pokémon info" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: "Ruta no encontrada" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Pokedex - Jemersoft';
  next();
});
