export class PokemonType {
  damage_relations: DamageRelations;
  game_indices: Index[];
  generation: Generation;
  id: number;
  move_damage_class: MoveDamageClass;
  moves: Mfe[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
}

export class DamageRelations {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageTo[];
  half_damage_from: HalfDamageFrom[];
  half_damage_to: HalfDamageTo[];
  no_damage_from: NoDamageFrom[];
  no_damage_to: NoDamageTo[];
}

export class DoubleDamageFrom {
  name: string;
  url: string;
}

export class DoubleDamageTo {
  name: string;
  url: string;
}

export class HalfDamageFrom {
  name: string;
  url: string;
}

export class HalfDamageTo {
  name: string;
  url: string;
}

export class NoDamageFrom {
  name: string;
  url: string;
}

export class NoDamageTo {
  name: string;
  url: string;
}

export class Index {
  game_index: number;
  generation: Generation;
}

export class Generation {
  name: string;
  url: string;
}

export class MoveDamageClass {
  name: string;
  url: string;
}

export class Mfe {
  name: string;
  url: string;
}

export class Name {
  language: Language;
  name: string;
}

export class Language {
  name: string;
  url: string;
}

export class Pokemon {
  pokemon: Pokemon;
  slot: number;
}
