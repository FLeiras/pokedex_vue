import { defineStore } from "pinia";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [],
    filteredPokemons: [],
    pokemonByName: [],
    selectedPokemon: null,
    loading: true,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
    filterType: "",
  }),
  getters: {
    paginatedPokemons: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.filteredPokemons.slice(start, end);
    },
    totalPages: (state) => {
      return Math.ceil(state.filteredPokemons.length / state.itemsPerPage);
    },
  },
  actions: {
    async getPokemons(pokemons) {
      this.loading = true;
      this.error = null;
      try {
        this.pokemons = pokemons;
        this.filteredPokemons = pokemons;
      } catch (error) {
        this.error = "Error fetching pokemons: " + error.message;
      } finally {
        this.loading = false;
      }
    },

    filterPokemonsByType(type) {
      this.filterType = type;
      if (type === "") {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter((pokemon) =>
          pokemon.type.includes(type)
        );
      }
      this.currentPage = 1;
    },

    filterPokemonsByName(name) {
      if (name === "") {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(name.toLowerCase())
        );
      }
      this.currentPage = 1;
    },

    async getPokemonById(pokemon) {
      this.loading = true;
      this.error = null;
      setTimeout(() => {
        try {
          this.selectedPokemon = pokemon;
        } catch (error) {
          this.error = "Error fetching pokemon: " + error.message;
        } finally {
          this.loading = false;
        }
      }, 2000);
    },

    async getPokemonByName(pokemon) {
      this.loading = true;
      this.error = null;
      try {
        this.pokemonByName = pokemon;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    setCurrentPage(page) {
      this.currentPage = page;
    },

    clearState() {
      this.pokemons = [], 
      this.selectedPokemon = null;
      this.pokemonByName = [];
      this.loading = true;
      this.error = null;
      this.currentPage = 1;
      this.itemsPerPage = 10;
    },
  },
});
