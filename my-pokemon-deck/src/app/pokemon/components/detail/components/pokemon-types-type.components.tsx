import { PokemonTypesComponent } from "../../common/pokemon-types.components";
import { Type } from "../../../model/api/pokemon-detail.model";

class PokemonTypesTypeComponentProps {
  title: string;
  types: Type[];
}

export function PokemonTypesTypeComponent({
  title,
  types,
}: PokemonTypesTypeComponentProps) {
  return (
    <>
      {types && types.length > 0 && (
        <div className="mb-2">
          <div className="mb-2 h4">{title}</div>
          <PokemonTypesComponent types={types} />
        </div>
      )}
    </>
  );
}
