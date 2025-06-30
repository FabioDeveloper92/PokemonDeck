import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Species } from "../../../model/api/pokemon-evolutions.model";
import { PokemonDetail } from "../../../model/api/pokemon-detail.model";
import { getPokemonDetail } from "../../../services/pokemon.service";
import { PokemonDetailTitleComponent } from "./pokemon-detail-title.components";
import { Link } from "react-router-dom";

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
  }, [species]);

  return (
    <>
      <li className="list-group-item border-0">
        {pokemon && (
          <Card style={{ minWidth: "175px", cursor: "pointer" }}>
            <Link
              to={`/detail/${pokemon.id}`}
              className="text-decoration-none text-reset"
            >
              <Card.Img
                className="py-2 bg-dark bg-gradient"
                height={125}
                title={pokemon.name}
                alt={pokemon.name}
                src={
                  pokemon.sprites?.other?.dream_world?.front_default ?? "/img/no-image.svg"
                }
              />
              <Card.Body>
                <div className="mb-3 text-center text-capitalize">
                  <PokemonDetailTitleComponent
                    pokemon={pokemon}
                    titleType="h5"
                  />
                </div>
              </Card.Body>
            </Link>
          </Card>
        )}
        {!pokemon && species && (
          <Card style={{ minWidth: "175px" }}>
            <Card.Img
              className="py-2 bg-dark bg-gradient"
              height={125}
              title={species.name}
              alt={species.name}
              src="/img/no-image.svg"
            />
            <Card.Body>
              <div className="mb-3 text-center text-capitalize">
                {species.name}
              </div>
            </Card.Body>
          </Card>
        )}
      </li>
    </>
  );
}
