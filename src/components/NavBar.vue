<script setup>
import Pagination from "../components/Pagination.vue";
import SearchPokemon from "../components/SearchPokemon.vue";
</script>

<template>
  <div>
    <img src="../../assets/images/logo2.webp" alt="Logo" class="img-nav" />
    <Pagination />
    <SearchPokemon />
  </div>
</template>

<style scoped>
.img-nav {
  position: absolute;
  width: 15rem;
  height: 5rem;
  margin-left: 1rem;
}
</style>
