<script setup>
import { ref, computed, watch } from "vue";
import { usePokemons } from "../composables/usePokemons";
import { capitalizeFirstLetter } from "../helpers/nameFormat.js"

const { getPokeByName, clearApp, filterByType, pokemons, filterByName } = usePokemons();

const pokemon = ref("");
const selectedType = ref("");

watch(pokemon, (newValue) => {
  filterByName(newValue);
});

const searchPokemon = async () => {
  try {
    clearApp();
    await getPokeByName(pokemon.value);
    pokemon.value = "";
  } catch (error) {
    console.error("Failed to search for pokemon:", error);
  }
};

const types = computed(() => {
  const allTypes = pokemons.value.flatMap(poke => poke.type);
  const uniqueTypes = [...new Set(allTypes)].map(type => capitalizeFirstLetter(type));
  return uniqueTypes;
});

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
        @keydown.enter="searchPokemon"
        class="form-control"
        placeholder="Ingresa el Pokémon"
        aria-describedby="button-addon2"
      />
      <select class="form-select ms-5" v-model="selectedType" @change="applyFilter">
        <option value="">All Types</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
  </div>
</template>
