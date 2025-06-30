import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PageHeaderComponent } from "../../../common/components/page-header.componets";
import { InputSearchComponent } from "../common/input-search.components";
import { getAllPokemonName } from "../../services/pokemon.service";
import { PokemonBaseData } from "../../model/api/pokemon-names-response.model";
import { useNavigate } from "react-router-dom";

export function PokedexContainer() {
  const navigate = useNavigate();

  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [pokemonBaseData, setPokemonBaseData] = useState<PokemonBaseData[]>([]);

  useEffect(() => {
    const init = async () => {
      const pokemonNames = await getAllPokemonName();
      setPokemonNames(pokemonNames.map((x) => x.name));
      setPokemonBaseData(pokemonNames);
    };
    init();
  }, []);

  function onSelectName(value: string) {
    const pokemonName = pokemonBaseData.find((x) => x.name === value).name;
    navigate(`/detail/${pokemonName}`);
  }

  return (
    <>
      <PageHeaderComponent
        title="Pokedex"
        subtitle="Search pokemon and get all informations"
      />
      <Container className="mb-3">
        <Row>
          <Col xs={12}>
            <div className="w-50 mb-4 mx-auto">
              <InputSearchComponent
                names={pokemonNames}
                exactlyMatch={true}
                onSelectName={onSelectName}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
