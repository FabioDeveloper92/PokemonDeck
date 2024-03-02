import { PokemonDetail } from "../model/api/pokemon-detail.model";
import { AddMyDeckResultEnum } from "../model/enum/AddMyDeckResultEnum.enum";
import { AddMyDeckResult } from "../model/internal/add-my-deck-result.model";

const MYDECK_KEY: string = "mydeck_key";

export function checkIsAvailableToAdd(pokemon: PokemonDetail): AddMyDeckResult {
  let myDeck = localStorage.getItem(MYDECK_KEY);

  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  if (myDeckObj.find((x: PokemonDetail) => x.id === pokemon.id))
    return new AddMyDeckResult(AddMyDeckResultEnum.PokemonFound, "");

  if (myDeckObj.length >= MAX_ITEM_DECK) {
    const pokemonNameToRemove = myDeckObj[0].name;
    return new AddMyDeckResult(
      AddMyDeckResultEnum.MaxCapacity,
      pokemonNameToRemove
    );
  }

  return new AddMyDeckResult(AddMyDeckResultEnum.Success, "");
}

export function addMyDeck(pokemon: PokemonDetail): AddMyDeckResult {
  let myDeck = localStorage.getItem(MYDECK_KEY);

  let myDeckObj: PokemonDetail[] = [];
  if (myDeck) myDeckObj = JSON.parse(myDeck);

  myDeckObj.push(pokemon);
  let myDeckStr = JSON.stringify(myDeckObj);
  localStorage.setItem(MYDECK_KEY, myDeckStr);

  return new AddMyDeckResult(AddMyDeckResultEnum.Success, "");
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

export function removeAllPokemonFromMyDesk(): boolean {
  let myDeck = localStorage.getItem(MYDECK_KEY);
  if (!myDeck) return false;

  localStorage.removeItem(MYDECK_KEY);

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
