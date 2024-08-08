<template>
  <div class="landing-page">
    <div class="col-4 text-center">
      <img src="../../assets/images/logo2.webp" alt="Logo Pokedex"/>
      <button class="btn btn-primary mt-5" @click="goToHome">Ingresar</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
  router.push({ path: "/home" });
};
</script>

<style scoped>
@import "../styles/landing.scss";
</style>
