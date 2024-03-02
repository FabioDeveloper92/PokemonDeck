import { useState, useEffect } from "react";
import { getAllPokemonName } from "../../services/pokemon.service";
import { makeMultipleAPICalls } from "../../services/generic.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputSearchComponent } from "../common/input-search.components";
import { PokemonListRecapComponent } from "./components/pokemon-list-recap.components";
import { PokemonBaseData } from "../../model/api/pokemon-names-response.model";
import { PokemonDetail } from "../../model/api/pokemon-detail.model";
import { PageHeaderComponent } from "../../../common/components/page-header.componets";
import {
  addMyDeck,
  checkIsAvailableToAdd,
  getMyDeck,
  removeFirstPokemonFromMyDesk,
} from "../../services/storage.service";
import { Button, Modal } from "react-bootstrap";
import { AddMyDeckResultEnum } from "../../model/enum/AddMyDeckResultEnum.enum";
import { AddMyDeckResult } from "../../model/internal/add-my-deck-result.model";

export function SearchContainer() {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [myDeck, setMyDeck] = useState<PokemonDetail[]>(null);
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [pokemonBaseData, setPokemonBaseData] = useState<PokemonBaseData[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);

  const [showModalResultAfterInsert, setShowModalResultAfterInsert] =
    useState<boolean>(false);
  const [resultAfterInsertMsg, setResultAfterInsertMsg] =
    useState<AddMyDeckResult>(null);
  const [pokemonToAdd, setPokemonToAdd] = useState<PokemonDetail>(null);

  useEffect(() => {
    const init = async () => {
      const pokemonNames = await getAllPokemonName();
      setPokemonNames(pokemonNames.map((x) => x.name));
      setPokemonBaseData(pokemonNames);
    };
    init();

    const myDeck = getMyDeck();
    setMyDeck(myDeck);
  }, []);

  function onSelectName(value: string) {
    setIsLoadingList(true);

    const pokemonUrls = pokemonBaseData
      .filter((x) => x.name.includes(value))
      .map((x) => x.url);

    const multipleAPICalls = async () => {
      const pokemonScheda = await makeMultipleAPICalls<PokemonDetail>(
        pokemonUrls
      );

      setPokemonList(pokemonScheda);
      setIsLoadingList(false);
    };

    multipleAPICalls();
  }

  const onCloseModalPokemonAddResult = () => {
    setShowModalResultAfterInsert(false);
    setPokemonToAdd(null);
  };

  function onAddPokemon(pokemon: PokemonDetail) {
    const resultCheck = checkIsAvailableToAdd(pokemon);

    if (resultCheck.result === AddMyDeckResultEnum.MaxCapacity) {
      setPokemonToAdd(pokemon);
      setResultAfterInsertMsg(resultCheck);
    } else if (resultCheck.result === AddMyDeckResultEnum.Success) {
      const result = addMyDeck(pokemon);
      setResultAfterInsertMsg(result);

      const myDeck = getMyDeck();
      setMyDeck(myDeck);
    } else setResultAfterInsertMsg(resultCheck);

    setShowModalResultAfterInsert(true);
  }

  function onForceAddPokemon() {
    removeFirstPokemonFromMyDesk();

    const result = addMyDeck(pokemonToAdd);
    setResultAfterInsertMsg(result);
    setShowModalResultAfterInsert(true);

    if (result.result === AddMyDeckResultEnum.Success) {
      const myDeck = getMyDeck();
      setMyDeck(myDeck);
    }
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
            <div className="w-50 mb-4 mx-auto">
              <InputSearchComponent
                names={pokemonNames}
                onSelectName={onSelectName}
                exactlyMatch={false}
              />
            </div>
          </Col>
          <Col xs={12}>
            <PokemonListRecapComponent
              pokemonDeck={myDeck}
              pokemonList={pokemonList}
              isLoadingList={isLoadingList}
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
          {resultAfterInsertMsg && (
            <>
              {resultAfterInsertMsg.result === AddMyDeckResultEnum.Success && (
                <>Pokemon added to your deck successfully</>
              )}
              {resultAfterInsertMsg.result ===
                AddMyDeckResultEnum.MaxCapacity && (
                <>
                  You have reached the maximum capacity of your deck.
                  <br />
                  If you continue <b>{resultAfterInsertMsg.pokemonToRemove} </b>
                  inserted will be removed.
                  <br />
                  <br />
                  Do you want continue?
                </>
              )}
              {resultAfterInsertMsg.result ===
                AddMyDeckResultEnum.PokemonFound && (
                <>Pokemon already present in your deck</>
              )}
              {resultAfterInsertMsg.result ===
                AddMyDeckResultEnum.GenericError && (
                <>An error occurred, try again or contact support</>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onCloseModalPokemonAddResult}>
            Close
          </Button>
          {resultAfterInsertMsg &&
            resultAfterInsertMsg.result === AddMyDeckResultEnum.MaxCapacity && (
              <Button variant="primary" onClick={(_) => onForceAddPokemon()}>
                Continue
              </Button>
            )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
