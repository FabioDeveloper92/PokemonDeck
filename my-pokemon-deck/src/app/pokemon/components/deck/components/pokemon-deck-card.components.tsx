import Col from "react-bootstrap/Col";
import {
  Ability,
  PokemonDetail,
} from "../../../model/api/pokemon-detail.model";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PokemonTypesComponent } from "../../common/pokemon-types.components";

class PokemonDeckCardComponentProps {
  pokemon: PokemonDetail;

  onRemovePokemon(pokemon: PokemonDetail): void;
}

export function PokemonDeckCardComponent({
  pokemon,
  onRemovePokemon,
}: PokemonDeckCardComponentProps) {
  const onClickRemove = () => {
    onRemovePokemon(pokemon);
  };

  return (
    <Col xs={12} sm={12} md={4} className="d-flex align-items-stretch">
      <Card className="shadow mb-3 w-100" style={{ cursor: "pointer" }}>
        <Card.Img
          className="py-2 bg-dark bg-gradient"
          height={125}
          title={pokemon.name}
          alt={pokemon.name}
          src={
            pokemon.sprites.other.dream_world.front_default ??
            "/img/no-image.svg"
          }
        ></Card.Img>
        <Card.Body>
          <Card.Subtitle className="mb-2">
            <PokemonTypesComponent types={pokemon.types} />
          </Card.Subtitle>
          <Card.Title className="mb-3 h4 text-capitalize">
            {pokemon.name}
          </Card.Title>
          <Card.Text className="mb-1 fw-normal text-start">
            <small>Experience:</small> {pokemon.base_experience ?? "Unknow"}
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
            variant="outline-danger"
            className="me-2"
            onClick={(_) => onClickRemove()}
          >
            Remove
          </Button>
          <Button variant="primary" className="me-2">
            <Link
              to={`/detail/${pokemon.id}`}
              className="text-white text-decoration-none"
            >
              Detail
            </Link>
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}
