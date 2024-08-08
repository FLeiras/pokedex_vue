export function filterByType(pokemons, type) {
  return pokemons.filter((pokemon) => pokemon.type.includes(type));
}

export function filterByName(pokemons, name) {
  return pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(name.toLowerCase())
  );
}

export function sortPokemons(pokemons, sortOrder) {
  if (sortOrder === "asc") {
    return pokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "desc") {
    return pokemons.sort((a, b) => b.name.localeCompare(a.name));
  }
  return pokemons;
}
