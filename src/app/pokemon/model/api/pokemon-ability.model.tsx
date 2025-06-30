export class PokemonAbility {
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}

export class EffectEntry {
  effect: string;
  language: Language;
  short_effect: string;
}

export class Language {
  name: string;
  url: string;
}

export class FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version_group: VersionGroup;
}

export class VersionGroup {
  name: string;
  url: string;
}

export class Generation {
  name: string;
  url: string;
}

export class Name {
  language: Language3;
  name: string;
}

export class Language3 {
  name: string;
  url: string;
}

export class Pokemon {
  is_hidden: boolean;
  pokemon: Pokemon;
  slot: number;
}
