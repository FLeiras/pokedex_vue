import pokemonApi from "../api/pokemonApi";

//* Convierto el peso en kilogramos
const convertWeightToKg = (weight) => (weight / 10).toFixed(1);

//* Esta función obtiene el valor de una estadística específica
const getStatValue = (stats, statName) => {
  const stat = stats.find((stat) => stat.stat.name === statName);
  return stat ? stat.base_stat : null;
};

//* Manejo los errores de manera centralizada
const handleApiError = (error, message) => {
  console.error(message, error);
  throw new Error(message);
};

//* Obtengo un Pokémon por su ID
export const getPokemonById = async (pokeId) => {
  try {
    const [pokemonResponse, speciesResponse] = await Promise.all([
      pokemonApi.get(`/pokemon/${pokeId}`),
      pokemonApi.get(`/pokemon-species/${pokeId}`),
    ]);

    const { types, name, sprites, weight, moves, stats } = pokemonResponse.data;
    const weightInKg = convertWeightToKg(weight);

    const flavorTextEntries = speciesResponse.data.flavor_text_entries;
    const spanishEntry = flavorTextEntries.find(
      (entry) => entry.language.name === "es"
    );

    return {
      id: pokeId,
      name,
      image: sprites.other.dream_world.front_default,
      peso: weightInKg,
      type: types.map((t) => t.type.name),
      description: spanishEntry
        ? spanishEntry.flavor_text
        : "No posee descripción",
      moves: moves.map((m) => m.move.name),
      hp: getStatValue(stats, "hp"),
      attack: getStatValue(stats, "attack"),
    };
  } catch (error) {
    handleApiError(error, "Error fetching pokemon by ID");
  }
};
