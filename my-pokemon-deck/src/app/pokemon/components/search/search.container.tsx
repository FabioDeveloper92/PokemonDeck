import React, { useState, useEffect } from "react";
import { getAllPokemonName } from "../../services/pokemon.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputSearchComponent } from "./components/input-search.components";
import { PokemonListRecap } from "./components/pokemon-list-recap.components";
import { PokemonBaseData } from "../../model/api/pokemon-response.model";
import { PokemonDetail } from "../../model/api/pokemon-detail.model";
import {
  addMyDeck,
  checkIsAvailableToAdd,
} from "../../services/storage.service";
import { Button, Modal } from "react-bootstrap";
import { AddMyDeckResultEnum } from "../../model/enum/AddMyDeckResultEnum.enum";

export function SearchContainer() {
  const [pokemonNames, setPokemonNames] = useState<PokemonBaseData[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);

  const [showModalResultAfterInsert, setShowModalResultAfterInsert] =
    useState<boolean>(false);
  const [resultAfterInsertMsg, setResultAfterInsertMsg] =
    useState<AddMyDeckResultEnum>(AddMyDeckResultEnum.GenericError);
  const [pokemonToAdd, setPokemonToAdd] = useState<PokemonDetail>(null);

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

  const onCloseModalPokemonAddResult = () => {
    setShowModalResultAfterInsert(false);
    setPokemonToAdd(null);
  };

  function onAddPokemon(pokemon: PokemonDetail) {
    const resultCheck = checkIsAvailableToAdd(pokemon);
    debugger;
    if (resultCheck === AddMyDeckResultEnum.MaxCapacity) {
      setPokemonToAdd(pokemon);
      setResultAfterInsertMsg(resultCheck);
    } else if (resultCheck === AddMyDeckResultEnum.Success) {
      const result = addMyDeck(pokemon);
      setResultAfterInsertMsg(result);
    } else setResultAfterInsertMsg(resultCheck);

    setShowModalResultAfterInsert(true);
  }

  function onForceAddPokemon() {
    removeFirstPokemonFromMyDesk();
    const result = addMyDeck(pokemonToAdd);
    setResultAfterInsertMsg(result);
    setShowModalResultAfterInsert(true);
  }

  return (
    <>
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
            <PokemonListRecap
              pokemonList={pokemonList}
              onAddPokemon={onAddPokemon}
            />
          </Col>
        </Row>
      </Container>
      <Modal
        show={showModalResultAfterInsert}
        onHide={onCloseModalPokemonAddResult}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insert Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultAfterInsertMsg === AddMyDeckResultEnum.Success && (
            <>Pokemon added to your deck successfully</>
          )}
          {resultAfterInsertMsg === AddMyDeckResultEnum.MaxCapacity && (
            <>
              You have reached the maximum capacity of your deck.<br/>
              If you continue the first pokemon inserted will be removed
            </>
          )}
          {resultAfterInsertMsg === AddMyDeckResultEnum.PokemonFoundError && (
            <>Pokemon already present in your deck</>
          )}
          {resultAfterInsertMsg === AddMyDeckResultEnum.GenericError && (
            <>An error occurred, try again or contact support</>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onCloseModalPokemonAddResult}>
            Close
          </Button>
          {resultAfterInsertMsg === AddMyDeckResultEnum.MaxCapacity && (
            <Button variant="primary" onClick={(_) => onForceAddPokemon()}>
              Continue
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
