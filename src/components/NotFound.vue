<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDetail = () => {
  router.push({ path: '/home' });
};

</script>

<template>
    <div class="container-notfound">
        <h1>¿Te perdiste?</h1>
        <h3>No te preocupes, hace click abajo</h3>
        <button @click="goToDetail" class="btn btn-dark btn-lg">Home</button>
    </div>
</template>

<style scoped>
@import '../styles/notFound.scss'
</style>