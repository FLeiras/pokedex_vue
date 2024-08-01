<template>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
      </li>
      <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
      </li>
    </ul>
</template>

<script setup>
import { usePokemons } from '../composables/usePokemons';

const { currentPage, totalPages, error, setCurrentPage } = usePokemons();

const prevPage = () => {
  if (currentPage.value > 1) {
    setCurrentPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    setCurrentPage(currentPage.value + 1);
  }
};

const goToPage = (page) => {
  setCurrentPage(page);
};
</script>

<style scoped>
@import '../styles/pagination.scss';
</style>