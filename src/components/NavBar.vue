<script setup>
import Pagination from "../components/Pagination.vue";
import SearchPokemon from "../components/SearchPokemon.vue";
import { usePokemons } from "../composables/usePokemons";

const { clearApp, loadPokemons } = usePokemons();

const allPokemons = () => {
  clearApp();
  loadPokemons();
};
</script>

<template>
  <div>
    <img src="../../assets/images/logo2.webp" alt="Logo" class="img-nav" />
    <Pagination />
    <SearchPokemon />
    <button @click="allPokemons" class="btn btn-primary" style="margin-left: 4rem;">
      Todos los pokémon
    </button>
  </div>
</template>

<style scoped>
.img-nav {
  position: absolute;
  width: 15rem;
  height: 5rem;
  margin-left: 1rem;
}
</style>
