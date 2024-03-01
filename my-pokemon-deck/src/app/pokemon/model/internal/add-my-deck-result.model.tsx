import { AddMyDeckResultEnum } from "../enum/AddMyDeckResultEnum.enum";

export class AddMyDeckResult {
  result: AddMyDeckResultEnum;
  pokemonToRemove: string;

  constructor(result: AddMyDeckResultEnum, pokemonToRemove: string) {
    this.result = result;
    this.pokemonToRemove = pokemonToRemove;
  }
}
