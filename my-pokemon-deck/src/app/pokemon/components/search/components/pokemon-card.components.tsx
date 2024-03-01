import { Card, Col } from "react-bootstrap";
import {
  Ability,
  PokemonDetail,
} from "../../../model/api/pokemon-detail.model";
import { PlusCircle } from "react-bootstrap-icons";
import { PokemonTypesComponent } from "../../common/pokemon-types.components";

class PokemonCardComponentProps {
  pokemon: PokemonDetail;
  alreadyInDeck: boolean;

  onSelectPokemon(pokemon: PokemonDetail): void;
}

export function PokemonCardComponent({
  pokemon,
  alreadyInDeck,
  onSelectPokemon,
}: PokemonCardComponentProps) {
  const onClickSelectPokemon = () => {
    if (!alreadyInDeck) onSelectPokemon(pokemon);
  };

  return (
    <Col xs={12} sm={12} md={3} className="d-flex align-items-stretch">
      <Card
        className="shadow mb-3 w-100"
        style={{ cursor: alreadyInDeck ? "" : "pointer" }}
        onClick={(_) => onClickSelectPokemon()}
      >
        <Card.Img
          className="py-2 bg-dark bg-gradient"
          height={125}
          title={pokemon.name}
          alt={pokemon.name}
          src={pokemon.sprites.other.dream_world.front_default ?? "/img/no-image.svg"}
        ></Card.Img>
        <Card.Body>
          <Card.Subtitle className="mb-2">
            <PokemonTypesComponent types={pokemon.types} />
          </Card.Subtitle>
          <Card.Title className="mb-3 h4 text-capitalize">
            {pokemon.name}
          </Card.Title>
          <Card.Subtitle className="mb-3 fw-normal">
            <small>My experience is</small> {pokemon.base_experience ?? "N.D."}
          </Card.Subtitle>
          <Card.Text className="mb-2 fw-normal text-start">
            <ul className="list-group">
              {pokemon.abilities.map(
                (ability: Ability, indexAbility: number) => (
                  <li
                    key={indexAbility}
                    className="text-capitalize list-group-item align-items-start"
                  >
                    {ability.ability.name}
                  </li>
                )
              )}
            </ul>
          </Card.Text>
        </Card.Body>
        {!alreadyInDeck && (
          <Card.Footer className="bg-primary text-white">
            <PlusCircle className="mb-1" /> Deck
          </Card.Footer>
        )}
        {alreadyInDeck && (
          <Card.Footer className="bg-warning text-white disabled">
            Already in deck
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
}
