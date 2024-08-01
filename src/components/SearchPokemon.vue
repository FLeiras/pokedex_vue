<script setup>
import { ref } from "vue";
import { usePokemons } from "../composables/usePokemons";
import { types } from "../helpers/types"

const { getPokeByName, clearApp, filterByType } = usePokemons();

const pokemon = ref("");
const selectedType = ref("");

const searchPokemon = async () => {
  try {
    clearApp();
    await getPokeByName(pokemon.value);
    pokemon.value = "";
  } catch (error) {
    console.error("Failed to search for pokemon:", error);
  }
};

const applyFilter = () => {
  filterByType(selectedType.value);
};
</script>

<template>
  <div class="container d-flex justify-content-center">
    <div class="input-group w-50">
      <input
        type="text"
        v-model="pokemon"
        class="form-control"
        placeholder="Ingresa el Pokémon"
        aria-describedby="button-addon2"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        @click="searchPokemon"
      >
        Buscar
      </button>
      <select class="form-select ms-5" v-model="selectedType" @change="applyFilter">
        <option value="">All Types</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
  </div>
</template>
