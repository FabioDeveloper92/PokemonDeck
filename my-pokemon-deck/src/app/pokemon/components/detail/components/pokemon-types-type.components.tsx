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
        <div className="mb-2 text-start">
          <div className="d-inline-block h6 mb-2 text-black me-2">{title}</div>
          <div className="d-inline-block">
            {<PokemonTypesComponent types={types} />}
          </div>
        </div>
      )}
    </>
  );
}
