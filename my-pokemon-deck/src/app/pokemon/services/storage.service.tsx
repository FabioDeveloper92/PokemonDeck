import { PokemonDetail } from "../model/api/pokemon-detail.model";
import { AddMyDeckResultEnum } from "../model/enum/AddMyDeckResultEnum.enum";

const MYDECK_KEY: string = "mydeck_key";
export const MAX_ITEM_DECK: number = 10;

export function checkIsAvailableToAdd(
  pokemon: PokemonDetail
): AddMyDeckResultEnum {
  let myDeck = localStorage.getItem(MYDECK_KEY);

  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  if (myDeckObj.find((x: PokemonDetail) => x.id === pokemon.id))
    return AddMyDeckResultEnum.PokemonFoundError;

  if (myDeckObj.length > MAX_ITEM_DECK) return AddMyDeckResultEnum.MaxCapacity;

  return AddMyDeckResultEnum.Success;
}

export function addMyDeck(pokemon: PokemonDetail): AddMyDeckResultEnum {
  let myDeck = localStorage.getItem(MYDECK_KEY);

  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  myDeckObj.push(pokemon);
  let myDeckStr = JSON.stringify(myDeckObj);
  localStorage.setItem(MYDECK_KEY, myDeckStr);

  return AddMyDeckResultEnum.Success;
}

export function removeFirstPokemonFromMyDesk(): void {
  let myDeck = localStorage.getItem(MYDECK_KEY);

  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  myDeckObj.shift();

  let myDeckStr = JSON.stringify(myDeckObj);
  localStorage.setItem(MYDECK_KEY, myDeckStr);
}

export function removePokemonFromMyDesk(pokemon: PokemonDetail): boolean {
  let myDeck = localStorage.getItem(MYDECK_KEY);
  if (!myDeck) return false;

  let myDeckObj: PokemonDetail[] = JSON.parse(myDeck);

  let index = myDeckObj.findIndex((x) => x.id === pokemon.id);
  myDeckObj.splice(index, 1);

  let myDeckStr = JSON.stringify(myDeckObj);
  localStorage.setItem(MYDECK_KEY, myDeckStr);

  return true;
}

export function getMyDeck(): PokemonDetail[] {
  let myDeck = localStorage.getItem(MYDECK_KEY);
  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  return myDeckObj;
}

export function getPokemonDetailFromMyDeck(id: number): PokemonDetail {
  let myDeck = localStorage.getItem(MYDECK_KEY);

  if (!myDeck) return null;

  let myDeckObj = JSON.parse(myDeck);

  return myDeckObj.find((x) => x.id === id);
}
