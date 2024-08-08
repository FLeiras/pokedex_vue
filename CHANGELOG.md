# Changelog

## [ Aca iría la versión 😂 ]

### Added
- **Debounce al Buscador en Tiempo Real**: Implementación de debounce en el buscador en tiempo real para mejorar el rendimiento de búsqueda.

### Changed
- **Pinia Store**:
  - **Store Composition API**: Migración a la API de Composition en el store `pokemonStoreCompositionApi` para una estructura más modular y flexible.
  - **Ordenamiento de Pokémon**: Implementación de la lógica de ordenamiento en el store con opciones "asc", "desc" y "original".
  - **Métodos de Filtrado**: Actualización de métodos para aplicar filtros y ordenamientos conjuntamente en el store.

- **Composable**:
  - **Uso de Composition API**: Adaptación del composable `usePokemons` para utilizar el store con Composition API.
  - **Ordenamiento y Paginación**: Inclusión de métodos para establecer el orden de los Pokémon y manejar la paginación.

- **Rutas**:
  - **Vue Router**: Reconfiguración de rutas utilizando `Vue Router`, con meta para mejor experiencia de usuario.

- **Servicios de API**:
  - **Servicios Pokémon**: Mejora en los servicios de API para obtener Pokémon por nombre e ID, con manejo de errores mejorado y optimización en la conversión de peso.

