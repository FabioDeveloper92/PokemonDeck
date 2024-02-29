import Col from "react-bootstrap/Col";
import {
  Ability,
  Type,
  PokemonDetail,
} from "../../../model/api/pokemon-detail.model";
import { Button, Card } from "react-bootstrap";
import NoImage from "../../../../../img/no-image.svg";
import { Link } from "react-router-dom";

class PokemonDeckCardProps {
  pokemon: PokemonDetail;

  onRemovePokemon(pokemon: PokemonDetail): void;
}

export function PokemonDeckCard({
  pokemon,
  onRemovePokemon,
  onGoToDetail,
}: PokemonDeckCardProps) {
  const onClickRemove = () => {
    onRemovePokemon(pokemon);
  };

  const onClickGoToDetail = () => {
    onGoToDetail(pokemon);
  };

  return (
    <Col xs={12} sm={12} md={3}>
      <Card className="shadow mb-3" style={{ cursor: "pointer" }}>
        <Card.Img
          className="py-2 bg-dark bg-gradient"
          height={125}
          title={pokemon.name}
          alt={pokemon.name}
          src={pokemon.sprites.other.dream_world.front_default ?? NoImage}
        ></Card.Img>
        <Card.Body>
          <Card.Subtitle className="mb-2">
            {pokemon.types.map((type: Type, indexType: number) => (
              <span
                key={indexType}
                className={
                  "badge fw-normal me-2 background-color-" + type.type.name
                }
              >
                {type.type.name}
              </span>
            ))}
          </Card.Subtitle>
          <Card.Title className="mb-3 h4 text-capitalize">
            {pokemon.name}
          </Card.Title>
          <Card.Text className="mb-1 fw-normal text-start">
            <small>Experience:</small> {pokemon.base_experience ?? "N.D."}
          </Card.Text>
          <Card.Text className="mb-2 fw-normal text-start">
            <ul className="list-group list-group-numbered">
              {pokemon.abilities.map(
                (ability: Ability, indexAbility: number) => (
                  <li
                    key={indexAbility}
                    className="list-group-item align-items-start"
                  >
                    {ability.ability.name}
                  </li>
                )
              )}
            </ul>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="btn btn-danger me-2"
            onClick={(_) => onClickRemove()}
          >
            Remove
          </Button>
          <Link className="btn btn-primary" to={`/detail/${pokemon.name}`}>
            Detail
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
