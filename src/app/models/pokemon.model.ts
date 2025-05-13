export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    // ... otras propiedades de sprites que puedas necesitar ...
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  // ... otras propiedades del Pokémon que puedas necesitar ...
}