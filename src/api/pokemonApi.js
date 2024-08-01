import axios from 'axios';

const pokemonApi = axios.create({
  baseURL: '/api'
});

export default pokemonApi;
