import { storeToRefs } from "pinia";
import { usePokemonStore } from "../store/pokemonStore";
import {
  getPokemonsApi,
  getPokemonByName,
} from "../services/pokemonApiService";
import { getPokemonById } from "../services/pokemonDetailService";

export const usePokemons = () => {
  const pokemonStore = usePokemonStore();
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

  //* Carga los Pokémon desde la API y actualiza el estado en el store.
  const loadPokemons = async () => {
    try {
      const pokemonsFromApi = await getPokemonsApi();
      pokemonStore.getPokemons(pokemonsFromApi);
    } catch (err) {
      pokemonStore.error = "Failed to load pokemons";
      console.error(err);
    }
  };

  //* Carga un Pokémon específico por ID y actualiza el estado en el store.
  const pokemonById = async (id) => {
    try {
      const pokemonSelected = await getPokemonById(id);
      pokemonStore.getPokemonById(pokemonSelected);
    } catch (err) {
      pokemonStore.error = "Pokémon no encontrado";
      console.error(err);
    }
  };

  //* Filtra los Pokémon por tipo y restablece la página actual a 1.
  const filterByType = (type) => {
    const lowerCaseType = type.toLowerCase();
    pokemonStore.filterPokemonsByType(lowerCaseType);
    pokemonStore.setCurrentPage(1);
  };

  //* Busca un Pokémon por nombre y actualiza el estado en el store.
  const getPokeByName = async (name) => {
    try {
      const pokemonSelected = await getPokemonByName(name);
      pokemonStore.getPokemons([pokemonSelected]);
    } catch (err) {
      pokemonStore.error = "Pokémon no encontrado";
      console.error(err);
    }
  };

  //* Metodo que utilizo para el filtrado en tiempo real
  const filterByName = (name) => {
    pokemonStore.filterPokemonsByName(name);
  };

  //* Establece la página actual para la paginación.
  const setCurrentPage = (page) => {
    pokemonStore.setCurrentPage(page);
  };

  //* Obtiene los datos para la página actual.
  const getDataPerPage = () => {
    pokemonStore.paginatedPokemons();
  };

  //* Limpia el estado de la aplicación.
  const clearApp = () => {
    pokemonStore.clearState();
  };

  return {
    pokemons,
    selectedPokemon,
    loading,
    error,
    loadPokemons,
    pokemonById,
    currentPage,
    itemsPerPage,
    paginatedPokemons,
    totalPages,
    setCurrentPage,
    getDataPerPage,
    clearApp,
    getPokeByName,
    filterByType,
    filteredPokemons,
    filterByName,
  };
};
