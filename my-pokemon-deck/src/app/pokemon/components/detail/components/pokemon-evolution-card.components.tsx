import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Species } from "../../../model/api/pokemon-evolutions.model";
import { PokemonDetail } from "../../../model/api/pokemon-detail.model";
import NoImage from "../../../../../img/no-image.svg";
import { getPokemonDetail } from "../../../services/pokemon.service";
import { PokemonTypesComponent } from "../../common/pokemon-types.components";
import { PokemonDetailTitleComponent } from "./pokemon-detail-title.components";

class PokemonEvolutionsCardComponentProps {
  species: Species;
}

export function PokemonEvolutionsCardComponent({
  species,
}: PokemonEvolutionsCardComponentProps) {
  const [pokemon, setPokemon] = useState<PokemonDetail>();

  useEffect(() => {
    const init = async () => {
      const pokemonDetail = await getPokemonDetail(species.name);
      setPokemon(pokemonDetail as PokemonDetail);
    };

    init();
  }, []);

  return (
    <>
      {species && (
        <li className="list-group-item border-0">
          <Card style={{ minWidth: "175px" }}>
            {pokemon ? (
              <Card.Img
                className="py-2 bg-dark bg-gradient"
                height={125}
                title={pokemon.name}
                alt={pokemon.name}
                src={
                  pokemon.sprites?.other?.dream_world?.front_default ?? NoImage
                }
              ></Card.Img>
            ) : (
              <Card.Img
                className="py-2 bg-dark bg-gradient"
                height={125}
                title={species.name}
                alt={species.name}
                src={NoImage}
              ></Card.Img>
            )}
            <Card.Body>
              <div className="mb-3 text-center text-capitalize">
                {pokemon ? (
                  <PokemonDetailTitleComponent
                    pokemon={pokemon}
                    titleType="h5"
                  />
                ) : (
                  <>{species.name}</>
                )}
              </div>
              <PokemonTypesComponent types={pokemon?.types} />
            </Card.Body>
          </Card>
        </li>
      )}
    </>
  );
}
