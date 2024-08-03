<script setup>
import { onMounted, watch } from "vue";
import Loader from "./Loading.vue";
import PokeCard from "./PokeCard.vue";
import NavBar from "./NavBar.vue";
import { usePokemons } from "../composables/usePokemons";

const { loading, error, loadPokemons, paginatedPokemons, clearApp, filteredPokemons } =
  usePokemons();

const initPage = () => {
  clearApp();
  loadPokemons();
};

onMounted(async () => {
  clearApp();
  await loadPokemons();
});

watch(filteredPokemons, (newPokemons) => {
});

</script>

<template>
  <div v-if="loading && !error">
    <Loader />
  </div>
  <div v-else>
    <NavBar v-if="!error" />
    <div v-if="error" class="error-container">
      <div class="alert alert-danger m-5" role="alert">{{ error }}</div>
      <button class="btn btn-primary" @click="initPage">
        Volver al Inicio
      </button>
    </div>
    <div v-else class="container-home p-3">
      <div class="row">
        <div
          v-for="pokemon in paginatedPokemons"
          :key="pokemon.id"
          class="col-custom-5 mb-3"
        >
          <PokeCard :pokemonId="pokemon.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../styles/error.scss";
@import "../styles/home.scss";
</style>
