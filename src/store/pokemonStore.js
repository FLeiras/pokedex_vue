import { defineStore } from "pinia";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemons: [],
    originalOrderPokemons: [],
    filteredPokemons: [],
    pokemonByName: [],
    selectedPokemon: null,
    loading: true,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
    filterType: "",
    sortOrder: "original",
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
        this.originalOrderPokemons = [...pokemons];
        this.applyFiltersAndSort();
      } catch (error) {
        this.error = "Error fetching pokemons: " + error.message;
      } finally {
        this.loading = false;
      }
    },

    filterPokemonsByType(type) {
      this.filterType = type;
      this.applyFiltersAndSort();
      this.currentPage = 1;
    },

    filterPokemonsByName(name) {
      this.applyFiltersAndSort(name);
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

    setSortOrder(order) {
      this.sortOrder = order;
      this.applyFiltersAndSort();
    },

    applyFiltersAndSort(name = "") {
      let pokemons = [...this.originalOrderPokemons];

      if (this.filterType) {
        pokemons = pokemons.filter((pokemon) =>
          pokemon.type.includes(this.filterType)
        );
      }

      if (name) {
        pokemons = pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(name.toLowerCase())
        );
      }

      if (this.sortOrder === "asc") {
        pokemons.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortOrder === "desc") {
        pokemons.sort((a, b) => b.name.localeCompare(a.name));
      }

      this.filteredPokemons = pokemons;
    },

    setCurrentPage(page) {
      this.currentPage = page;
    },

    clearState() {
      this.pokemons = [];
      this.originalOrderPokemons = [];
      this.selectedPokemon = null;
      this.pokemonByName = [];
      this.loading = true;
      this.error = null;
      this.currentPage = 1;
      this.itemsPerPage = 10;
      this.filterType = "";
      this.sortOrder = "original";
    },
  },
});
