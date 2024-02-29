import React, { useState, useEffect } from "react";
import { getAllPokemonName } from "../../services/pokemon.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputSearchComponent } from "./components/input-search.components";
import { PokemonListRecap } from "./components/pokemon-list-recap.components";
import { PokemonBaseData } from "../../model/api/pokemon-response.model";
import { PokemonDetail } from "../../model/api/pokemon-detail.model";

export function SearchContainer() {
  const [pokemonNames, setPokemonNames] = useState<PokemonBaseData[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const init = async () => {
      const pokemonNames = await getAllPokemonName();
      setPokemonNames(pokemonNames);
    };
    init();
  }, []);

  function onSelectName(pokemon: PokemonBaseData[]) {
    const multipleAPICalls = async () => {
      const pokemonScheda = await makeMultipleAPICalls(
        pokemon.map((x) => x.url)
      );
      setPokemonList(pokemonScheda);
    };

    multipleAPICalls();
  }

  async function makeAPICall(endpoint: string): Promise<PokemonDetail> {
    const response = await fetch(endpoint);

    if (response.ok) {
      const pokemonResponse = response.json() as Promise<PokemonDetail>;
      return await pokemonResponse;
    }

    return null;
  }

  async function makeMultipleAPICalls(
    endpoints: string[]
  ): Promise<PokemonDetail[]> {
    const promises = endpoints.map(makeAPICall);
    const responses = await Promise.all(promises);

    return responses;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} className="text-center mb-2">
          <h1 className="h2">Search your favourite Pokemon</h1>
          <h3 className="h5">Gotta Catch' Em All</h3>
        </Col>
        <Col xs={12}>
          <InputSearchComponent
            pokemonBaseData={pokemonNames}
            onSelectPokemon={onSelectName}
          />
        </Col>
        <Col xs={12}>
          <PokemonListRecap pokemonList={pokemonList} />
        </Col>
      </Row>
    </Container>
  );
}
