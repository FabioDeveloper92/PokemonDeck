export class PokemonNamesResponse {
  count: number;
  next: number;
  previous: number;
  results: PokemonBaseData[];
}

export class PokemonBaseData {
  name: string;
  url: string;
}
