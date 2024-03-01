import { useState, useEffect } from "react";
import { getAllPokemonName } from "../../services/pokemon.service";
import { makeMultipleAPICalls } from "../../services/generic.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputSearchComponent } from "./components/input-search.components";
import { PokemonListRecap } from "./components/pokemon-list-recap.components";
import { PokemonBaseData } from "../../model/api/pokemon-response.model";
import { PokemonDetail } from "../../model/api/pokemon-detail.model";
import { PageHeaderComponent } from "../../../common/components/page-header.componets";
import {
  addMyDeck,
  checkIsAvailableToAdd,
  removeFirstPokemonFromMyDesk,
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

  const onCloseModalPokemonAddResult = () => {
    setShowModalResultAfterInsert(false);
    setPokemonToAdd(null);
  };

  function onAddPokemon(pokemon: PokemonDetail) {
    const resultCheck = checkIsAvailableToAdd(pokemon);

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
      <PageHeaderComponent
        title="Welcome to MyPokemon Deck"
        subtitle="Search your pokemon, and start the adventure!"
      />
      <Container className="mb-3">
        <Row>
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
          <Modal.Title>Add Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultAfterInsertMsg === AddMyDeckResultEnum.Success && (
            <>Pokemon added to your deck successfully</>
          )}
          {resultAfterInsertMsg === AddMyDeckResultEnum.MaxCapacity && (
            <>
              You have reached the maximum capacity of your deck.
              <br />
              If you continue the first pokemon inserted will be removed. Do you want continue?
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
