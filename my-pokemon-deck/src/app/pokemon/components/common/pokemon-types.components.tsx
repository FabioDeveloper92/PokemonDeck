import { Type } from "../../model/api/pokemon-detail.model";

class PokemonTypesComponentProps {
  types: Type[];
}

export function PokemonTypesComponent({ types }: PokemonTypesComponentProps) {
  return (
    <>
      {types && (
        <div className="mb-3">
          {types.map((type: Type, indexType: number) => (
            <span
              key={indexType}
              className={
                "badge px-3 py-2 fw-normal me-2 background-color-" +
                type.type.name
              }
            >
              {type.type.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
