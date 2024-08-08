import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  filterByType,
  filterByName,
  sortPokemons,
} from "../helpers/pokemonFilters.js";

export const usePokemonStoreCompositionApi = defineStore("pokemon", () => {
  const pokemons = ref([]);
  const originalOrderPokemons = ref([]);
  const filteredPokemons = ref([]);
  const pokemonByName = ref([]);
  const selectedPokemon = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const filterType = ref("");
  const sortOrder = ref("original");

  const paginatedPokemons = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredPokemons.value.slice(start, end);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredPokemons.value.length / itemsPerPage.value);
  });

  const applyFiltersAndSort = (name = "") => {
    let pokemonsList = [...originalOrderPokemons.value];

    if (filterType.value) {
      pokemonsList = filterByType(pokemonsList, filterType.value);
    }

    if (name) {
      pokemonsList = filterByName(pokemonsList, name);
    }

    pokemonsList = sortPokemons(pokemonsList, sortOrder.value);

    filteredPokemons.value = pokemonsList;
  };

  const getPokemons = async (newPokemons) => {
    loading.value = true;
    try {
      pokemons.value = newPokemons;
      originalOrderPokemons.value = [...newPokemons];
      applyFiltersAndSort();
    } catch (err) {
      error.value = "Error fetching pokemons: " + err.message;
    } finally {
      loading.value = false;
    }
  };

  const filterPokemonsByType = (type) => {
    filterType.value = type;
    applyFiltersAndSort();
    currentPage.value = 1;
  };

  const filterPokemonsByName = (name) => {
    applyFiltersAndSort(name);
    currentPage.value = 1;
  };

  const getPokemonById = async (pokemon) => {
    loading.value = true;
    try {
      selectedPokemon.value = pokemon;
    } catch (err) {
      error.value = "Error fetching pokemon: " + err.message;
    } finally {
      loading.value = false;
    }
  };

  const getPokemonByName = async (pokemon) => {
    loading.value = true;
    try {
      pokemonByName.value = pokemon;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const setSortOrder = (order) => {
    sortOrder.value = order;
    applyFiltersAndSort();
  };

  const setCurrentPage = (page) => {
    currentPage.value = page;
  };

  const clearState = () => {
    pokemons.value = [];
    originalOrderPokemons.value = [];
    selectedPokemon.value = null;
    pokemonByName.value = [];
    loading.value = true;
    error.value = null;
    currentPage.value = 1;
    itemsPerPage.value = 10;
    filterType.value = "";
    sortOrder.value = "original";
  };

  return {
    pokemons,
    originalOrderPokemons,
    filteredPokemons,
    pokemonByName,
    selectedPokemon,
    loading,
    error,
    currentPage,
    itemsPerPage,
    filterType,
    sortOrder,
    paginatedPokemons,
    totalPages,
    getPokemons,
    filterPokemonsByType,
    filterPokemonsByName,
    getPokemonById,
    getPokemonByName,
    setSortOrder,
    setCurrentPage,
    clearState,
  };
});
