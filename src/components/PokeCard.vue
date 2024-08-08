<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { capitalizeFirstLetter } from '../helpers/nameFormat.js';
import { usePokemonsComposition } from "../composables/usePokemonsCompositionApi";

const props = defineProps({
  pokemonId: {
    type: Number,
    required: true,
  }
});

const router = useRouter();
const { pokemons } = usePokemonsComposition();

const pokemon = computed(() => pokemons.value.find(p => p.id === props.pokemonId));

const pokeName = computed(() => {
  return pokemon.value ? capitalizeFirstLetter(pokemon.value.name) : '';
});

const goToDetail = () => {
  router.push({ path: `/pokemon/${props.pokemonId}` });
};
</script>

<template>
  <div class="container-card" @click="goToDetail">
    <img class="image-card" :src="pokemon.image" alt="Imagen del Pókemon" v-if="pokemon">
    <div class="name-card" v-if="pokemon">{{ pokeName }}</div>
    <div class="name-card" v-if="pokemon">Peso: {{ pokemon.peso }} Kg</div>
    <div class="type-card" v-if="pokemon">
      <li v-for="type in pokemon.type" :key="type" :class="type">
      <span>{{ type }}</span>
    </li>
    </div>
  </div>
</template>

<style scoped>
@import '../style.scss';
@import "../styles/pokeCard.scss";
</style>
