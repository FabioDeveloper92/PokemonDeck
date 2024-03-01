export class PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: EggGroup[];
  evolution_chain: EvolutionChain;
  evolves_from_species: EvolvesFromSpecies;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Generation;
  growth_rate: GrowthRate;
  habitat: Habitat;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Shape;
  varieties: Variety[];
}

export class Color {
  name: string;
  url: string;
}

export class EggGroup {
  name: string;
  url: string;
}

export class EvolutionChain {
  url: string;
}

export class EvolvesFromSpecies {
  name: string;
  url: string;
}

export class FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

export class Version {
  name: string;
  url: string;
}

export class Genera {
  genus: string;
  language: Language;
}

export class Language {
  name: string;
  url: string;
}

export class Generation {
  name: string;
  url: string;
}

export class GrowthRate {
  name: string;
  url: string;
}

export class Habitat {
  name: string;
  url: string;
}

export class Name {
  language: Language;
  name: string;
}

export class PalParkEncounter {
  area: Area;
  base_score: number;
  rate: number;
}

export class Area {
  name: string;
  url: string;
}

export class PokedexNumber {
  entry_number: number;
  pokedex: Pokedex;
}

export class Pokedex {
  name: string;
  url: string;
}

export class Shape {
  name: string;
  url: string;
}

export class Variety {
  is_default: boolean;
  pokemon: Pokemon;
}

export class Pokemon {
  name: string;
  url: string;
}
