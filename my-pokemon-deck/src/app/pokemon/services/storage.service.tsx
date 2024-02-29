import { PokemonDetail } from "../model/api/pokemon-detail.model";
import { AddMyDeckResultEnum } from "../model/enum/AddMyDeckResultEnum.enum";

const MYDECK_KEY = "mydeck_key";
export function addMyDeck(pokemon: PokemonDetail): AddMyDeckResultEnum {
  let myDeck = localStorage.getItem(MYDECK_KEY);

  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  if (myDeckObj.find((x: PokemonDetail) => x.id === pokemon.id))
    return AddMyDeckResultEnum.PokemonFoundError;

  if (myDeckObj.length > 10) return AddMyDeckResultEnum.MaxCapacity;

  myDeckObj.push(pokemon);
  let myDeckStr = JSON.stringify(myDeckObj);
  localStorage.setItem(MYDECK_KEY, myDeckStr);

  return AddMyDeckResultEnum.Success;
}

export function getMyDeck(): PokemonDetail[] {
  let myDeck = localStorage.getItem(MYDECK_KEY);
  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  return myDeckObj;
}
