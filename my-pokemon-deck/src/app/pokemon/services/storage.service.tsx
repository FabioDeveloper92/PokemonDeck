import { PokemonDetail } from "../model/api/pokemon-detail.model";


const MYDECK_KEY = "mydeck_key";
export function addPokemon(pokemon: PokemonDetail) {
    let myDeck = sessionStorage.getItem(MYDECK_KEY);

    sessionStorage.setItem(MYDECK_KEY, "");
}
