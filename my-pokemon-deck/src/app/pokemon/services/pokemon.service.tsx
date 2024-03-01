import { PokemonBaseData } from "../model/api/pokemon-names-response.model";
import { PokemonNamesResponse } from "../model/api/pokemon-names-response.model";
import { PokemonSpecies } from "../model/api/pokemon-species.model";
import { PokemonEvolutions } from "../model/api/pokemon-evolutions.model";
import { PokemonDetail } from "../model/api/pokemon-detail.model";

const API_URL = "https://pokeapi.co/api/v2";

export async function getAllPokemonName(): Promise<PokemonBaseData[]> {
  const response = await fetch(`${API_URL}/pokemon/?limit=100000`);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<PokemonNamesResponse>;
    return (await pokemonResponse).results;
  }

  return [];
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const response = await fetch(`${API_URL}/pokemon/${name}`);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<PokemonDetail>;
    return await pokemonResponse;
  }

  return null;
}

export async function getPokemonDetailById(id: number): Promise<PokemonDetail> {
  const response = await fetch(`${API_URL}/pokemon/${id}`);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<PokemonDetail>;
    return await pokemonResponse;
  }

  return null;
}

export async function getPokemonSpecies(
  id: number,
  language: string
): Promise<PokemonSpecies> {
  const response = await fetch(`${API_URL}/pokemon-species/${id}`);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<PokemonSpecies>;
    let pokemonSpecies = await pokemonResponse;

    if (pokemonSpecies && pokemonSpecies.flavor_text_entries) {
      pokemonSpecies.flavor_text_entries =
        pokemonSpecies.flavor_text_entries.filter(
          (x) => x.language.name === language
        );
    }

    if (pokemonSpecies && pokemonSpecies.genera) {
      pokemonSpecies.genera = pokemonSpecies.genera.filter(
        (x) => x.language.name === language
      );
    }

    return pokemonSpecies;
  }

  return null;
}

export async function getPokemonEvolutions(
  id: number
): Promise<PokemonEvolutions> {
  const response = await fetch(`${API_URL}/evolution-chain/${id}`);

  if (response.ok) {
    const pokemonResponse = response.json() as Promise<PokemonEvolutions>;
    return await pokemonResponse;
  }

  return null;
}
