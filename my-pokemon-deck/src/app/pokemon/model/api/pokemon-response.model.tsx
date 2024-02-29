export class PokemonResponse {
  count: number;
  next: number;
  previous: number;
  results: PokemonBaseData[];
}

export class PokemonBaseData extends Response {
  name: string;
  url: string;
}
