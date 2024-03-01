import { PokemonDetail } from "../../../model/api/pokemon-detail.model";

class PokemonDetailTitleComponentProps {
  pokemon: PokemonDetail;
  titleType: string;
}

export function PokemonDetailTitleComponent({
  pokemon,
  titleType
}: PokemonDetailTitleComponentProps) {
  const renderPokemonId = (): string => {
    let idNormalize = `000${pokemon.id}`;

    let exceptCharacters = idNormalize.length - 4;
    idNormalize = idNormalize.slice(exceptCharacters);

    return `#${idNormalize}`;
  };

  return (
    <>
      <h2 className={`${titleType ?? "h2"} text-capitalize`}>
        {pokemon.name} <span className="text-muted">{renderPokemonId()}</span>
      </h2>
    </>
  );
}
