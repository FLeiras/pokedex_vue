import { storeToRefs } from "pinia";
import { usePokemonStoreCompositionApi } from "../store/pokemonStoreCompositionApi";
import { getPokemonsApi, getPokemonByName } from "../services/pokemonApiService";
import { getPokemonById } from "../services/pokemonDetailService";
import { handleAsyncOperation } from "../helpers/asyncHelper";

export const usePokemonsComposition = () => {
  const pokemonStore = usePokemonStoreCompositionApi();
  const {
    pokemons,
    selectedPokemon,
    loading,
    error,
    currentPage,
    itemsPerPage,
    paginatedPokemons,
    totalPages,
    filteredPokemons,
  } = storeToRefs(pokemonStore);

  const loadPokemons = () => handleAsyncOperation(
    getPokemonsApi,
    (pokemonsFromApi) => pokemonStore.getPokemons(pokemonsFromApi),
    (err) => {
      error.value = "Error al cargar los pokémons";
      console.error(err);
    }
  );

  const pokemonById = (id) => handleAsyncOperation(
    () => getPokemonById(id),
    (pokemonSelected) => pokemonStore.getPokemonById(pokemonSelected),
    (err) => {
      error.value = "Pokémon no encontrado";
      console.error(err);
    }
  );

  const getPokeByName = (name) => handleAsyncOperation(
    () => getPokemonByName(name),
    (pokemonSelected) => pokemonStore.getPokemons([pokemonSelected]),
    (err) => {
      error.value = "Pokémon no encontrado";
      console.error(err);
    }
  );

  const filterByType = (type) => {
    const lowerCaseType = type.toLowerCase();
    pokemonStore.filterPokemonsByType(lowerCaseType);
    pokemonStore.setCurrentPage(1);
  };

  const filterByName = (name) => {
    pokemonStore.filterPokemonsByName(name);
  };

  const setCurrentPage = (page) => {
    pokemonStore.setCurrentPage(page);
  };

  const clearApp = () => {
    pokemonStore.clearState();
  };

  const setSortOrder = (order) => {
    pokemonStore.setSortOrder(order);
  };

  return {
    clearApp,
    currentPage,
    error,
    filterByName,
    filterByType,
    filteredPokemons,
    getPokeByName,
    itemsPerPage,
    loading,
    loadPokemons,
    paginatedPokemons,
    pokemonById,
    pokemons,
    selectedPokemon,
    setCurrentPage,
    setSortOrder,
    totalPages,
  };
};
