import pokemonApi from '../api/pokemonApi';

//* Obtiene un Pokémon por su ID
export const getPokemonById = async (pokeId) => {
  try {
    const response = await pokemonApi.get(`/pokemon/${pokeId}`);
    const { types, name, sprites, weight, moves, stats } = response.data;
    const speciesResponse = await pokemonApi.get(`/pokemon-species/${pokeId}`);
    const weightInKg = (weight / 10).toFixed(1);
    const flavorTextEntries = speciesResponse.data.flavor_text_entries;
    const spanishEntry = flavorTextEntries.find(
      entry => entry.language.name === 'es'
    );

    const getStatValue = (stats, statName) => {
      const stat = stats.find(stat => stat.stat.name === statName);
      return stat ? stat.base_stat : null;
    };

    return {
      id: pokeId,
      name,
      image: sprites.other.dream_world.front_default,
      peso: weightInKg,
      type: types.map(t => t.type.name),
      description: spanishEntry ? spanishEntry.flavor_text : 'No posee descripción',
      moves: moves.map(m => m.move.name),
      hp: getStatValue(stats, 'hp'),
      attack: getStatValue(stats, 'attack'),
    };
  } catch (error) {
    console.error('Error fetching pokemon by ID:', error);
    throw new Error('Failed to fetch Pokemon by ID');
  }
};
