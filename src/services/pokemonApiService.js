import axios from 'axios';
import pokemonApi from '../api/pokemonApi';

//* Convierte el peso en kilogramos
const convertWeightToKg = (weight) => (weight / 10).toFixed(1);

//* Obtiene todos los Pokémon
export const getPokemonsApi = async () => {
  try {
    const response = await pokemonApi.get('/pokemon/?limit=100');
    const pokeUrls = response.data.results.map(poke => poke.url);
    const pokePromises = pokeUrls.map(url => axios.get(url));
    const pokeAll = await Promise.all(pokePromises);

    return pokeAll.map(({ data }) => {
      const { id, types, name, sprites, weight } = data;
      return {
        id,
        name,
        image: sprites.other.home.front_default,
        peso: convertWeightToKg(weight),
        type: types.map(t => t.type.name),
      };
    });
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw new Error('Failed to fetch Pokemons');
  }
};

//* Obtiene un Pokémon por su nombre
export const getPokemonByName = async (name) => {
  try {
    const lowerCaseName = name.toLowerCase();
    const response = await pokemonApi.get(`/pokemon/${lowerCaseName}`);
    const { id, types, sprites, weight } = response.data;
    return {
      id,
      name,
      image: sprites.other.home.front_default,
      peso: convertWeightToKg(weight),
      type: types.map(t => t.type.name),
    };
  } catch (error) {
    console.error('Error fetching pokemon by name:', error);
    throw new Error('Failed to fetch Pokemon by name');
  }
};
