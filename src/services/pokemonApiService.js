import pokemonApi from "../api/pokemonApi";

//* Convierto el peso en kilogramos
const convertWeightToKg = (weight) => (weight / 10).toFixed(1);

//* Manejo los errores de manera centralizada
const handleApiError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

//* Obtengo todos los Pokémon
export const getPokemonsApi = async () => {
  try {
    const response = await pokemonApi.get("/pokemon/?limit=100");
    const pokeUrls = response.data.results.map((poke) => poke.url);

    const pokePromises = pokeUrls.map((url) => pokemonApi.get(url));
    const pokeAll = await Promise.all(pokePromises);

    return pokeAll.map(({ data }) => {
      const { id, types, name, sprites, weight } = data;
      return {
        id,
        name,
        image: sprites.other.home.front_default,
        peso: convertWeightToKg(weight),
        type: types.map((t) => t.type.name),
      };
    });
  } catch (error) {
    handleApiError(error, "Error fetching pokemons");
  }
};

//* Pokémon por nombre
export const getPokemonByName = async (name) => {
  try {
    const lowerCaseName = name.toLowerCase();
    const response = await pokemonApi.get(`/pokemon/${lowerCaseName}`);
    const { id, types, sprites, weight } = response.data;

    return {
      id,
      name: lowerCaseName,
      image: sprites.other.home.front_default,
      peso: convertWeightToKg(weight),
      type: types.map((t) => t.type.name),
    };
  } catch (error) {
    handleApiError(error, "Error fetching pokemon by name");
  }
};
