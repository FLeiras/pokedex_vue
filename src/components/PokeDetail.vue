<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, onUnmounted, ref } from "vue";

import Loader from "./Loading.vue";
import { capitalizeFirstLetter } from "../helpers/nameFormat.js";
import { usePokemonsComposition } from "../composables/usePokemonsCompositionApi";

const route = useRoute();
const router = useRouter();
const showFullList = ref(false);
const id = route.params.id;
const { selectedPokemon, loading, error, pokemonById, clearApp } =
usePokemonsComposition();

const pokeName = computed(() => {
  return selectedPokemon.value
    ? capitalizeFirstLetter(selectedPokemon.value.name)
    : "";
});

const toggleShowFullList = () => {
  showFullList.value = !showFullList.value;
};

const goHome = () => {
  router.push({ path: "/home" });
};

onMounted(() => {
  pokemonById(id);
});

onUnmounted(() => {
  clearApp();
});
</script>

<template>
    <div v-if="loading && error === null">
      <Loader />
    </div>
    <div v-else>
      <div v-if="error" class="error-container">
        <div class="alert alert-danger m-5" role="alert">{{ error }}</div>
        <button class="btn btn-primary" @click="goHome">
          Volver al Inicio
        </button>
      </div>
      <div v-else class="container p-3">
        <button class="btn btn-outline-primary btn-lg mb-3" @click="goHome">
          Home
        </button>
        <div
          v-if="selectedPokemon && !loading && !error"
          class="row mt-4 align-items-start"
        >
          <div class="col-md-4 text-center mb-3 mb-md-0">
            <img
              class="image-detail img-fluid"
              :src="selectedPokemon.image"
              :alt="selectedPokemon.name"
            />
          </div>
          <div class="col-md-8">
            <div class="info-detail">
              <h1>
                {{ pokeName }} <span>Nº{{ id }}</span>
              </h1>
              <div class="container-info">
                <h2>{{ selectedPokemon.description }}</h2>
                <div class="row mb-3">
                  <div class="col-6">
                    <p>Peso:</p>
                    <h3>{{ selectedPokemon.peso }} Kg</h3>
                  </div>
                  <div class="col-6">
                    <p>HP:</p>
                    <h3>{{ selectedPokemon.hp }}</h3>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <p>Tipo:</p>
                    <div class="type-card">
                      <li
                        v-for="type in selectedPokemon.type"
                        :key="type"
                        :class="type"
                      >
                        <a>{{ type }}</a>
                      </li>
                    </div>
                  </div>
                  <div class="col-6">
                    <p>Attack:</p>
                    <h3>{{ selectedPokemon.attack }}</h3>
                  </div>
                </div>
                <p>Movimientos Especiales:</p>
                <div class="moves">
                  <ul>
                    <li
                      v-for="(move, index) in selectedPokemon.moves.slice(
                        0,
                        showFullList ? selectedPokemon.moves.length : 22
                      )"
                      :key="index"
                      class="list-inline-item"
                    >
                      #{{ move }}
                    </li>
                  </ul>
                  <button
                    class="btn btn-link text-black"
                    @click="toggleShowFullList"
                  >
                    {{ showFullList ? "Ver menos" : "Ver más" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
@import "../styles/error.scss";
@import "../styles/detail.scss";
@import "../styles/pokeCard.scss";
</style>
