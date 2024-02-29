import { PokemonBaseData } from "../model/api/pokemon-response.model";
import { PokemonResponse } from "../model/api/pokemon-response.model";

const API_URL = "https://pokeapi.co/api/v2";

export async function getAllPokemonName(): Promise<PokemonBaseData[]> {
  const response = await fetch(`${API_URL}/pokemon/?limit=100000`);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<PokemonResponse>;
    return (await pokemonResponse).results;
  }

  return [];
}
