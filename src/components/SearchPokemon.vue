<script setup>
import { debounce } from "lodash";
import { ref, computed, watch } from "vue";
import { usePokemonsComposition } from "../composables/usePokemonsCompositionApi";
import { capitalizeFirstLetter } from "../helpers/nameFormat.js";

const {
  clearApp,
  filterByName,
  filterByType,
  getPokeByName,
  pokemons,
  setSortOrder,
} = usePokemonsComposition();

const pokemon = ref("");
const selectedType = ref("");
const sortOrder = ref("original");

const debouncedFilterByName = debounce((newValue) => {
  filterByName(newValue);
}, 300);

watch(pokemon, (newValue) => {
  debouncedFilterByName(newValue);
});

watch(selectedType, () => {
  filterByType(selectedType.value);
});

watch(sortOrder, () => {
  setSortOrder(sortOrder.value);
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
  const allTypes = pokemons.value.flatMap((poke) => poke.type);
  const uniqueTypes = [...new Set(allTypes)].map((type) =>
    capitalizeFirstLetter(type)
  );
  return uniqueTypes;
});
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
      <select class="form-select ms-5" v-model="selectedType">
        <option value="">Todos los tipos</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
      <select class="form-select ms-5" v-model="sortOrder">
        <option value="original">Orden alfabético</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  </div>
</template>
