import axios from "axios";

const pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//! Interceptor para manejar errores globales
pokemonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    //! Manejo de errores globales
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default pokemonApi;
