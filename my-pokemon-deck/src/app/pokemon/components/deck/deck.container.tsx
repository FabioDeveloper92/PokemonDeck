import { useEffect, useState, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PokemonDetail } from "../../model/api/pokemon-detail.model";
import { RemoveMyDeckResultEnum } from "../../model/enum/RemoveMyDeckResultEnum.enum";
import {
  getMyDeck,
  MAX_ITEM_DECK,
  removePokemonFromMyDesk,
} from "../../services/storage.service";
import { PokemonDeckCard } from "./components/pokemon-deck-card.components";
import { StarFill } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
import { PageHeaderComponent } from "../../../common/components/page-header.componets";

export function DeckContainer() {
  const [myDeck, setMyDeck] = useState<PokemonDetail[]>([]);
  const [totalBaseExperience, setTotalBaseExperience] = useState<number>(0);
  const [statusClassName, setStatusClassName] = useState<string>("");

  const [pokemonToRemove, setPokemonToRemove] = useState<PokemonDetail>(null);
  const [removeMsg, setRemoveMsg] = useState<RemoveMyDeckResultEnum>(null);
  const [showModalRemovePokemon, setShowModalRemovePokemon] =
    useState<boolean>(false);

  useEffect(() => {
    loadMyDesk();
  }, []);

  function loadMyDesk() {
    const myDeckObj = getMyDeck();
    setMyDeck(myDeckObj);

    if (myDeckObj.length < MAX_ITEM_DECK) setStatusClassName("text-warning");
    else if (myDeckObj.length === MAX_ITEM_DECK)
      setStatusClassName("text-success");
    else setStatusClassName("text-danger");

    let totalBE = 0;
    if (myDeckObj && myDeckObj.length > 0)
      totalBE = myDeckObj.map((x) => x.base_experience).reduce(reducer);

    setTotalBaseExperience(totalBE);
  }

  function reducer(accumulator: number, currentValue: number, index: number) {
    const returns = accumulator + currentValue;
    return returns;
  }

  const onCloseModalRemovePokemon = () => {
    setShowModalRemovePokemon(false);
    setPokemonToRemove(null);
  };

  const onRemovePokemon = (pokemon: PokemonDetail) => {
    setPokemonToRemove(pokemon);
    setRemoveMsg(RemoveMyDeckResultEnum.ToConfirm);
    setShowModalRemovePokemon(true);
  };

  const onConfirmRemovePokemon = () => {
    let result = removePokemonFromMyDesk(pokemonToRemove);
    if (result) {
      loadMyDesk();
      setRemoveMsg(RemoveMyDeckResultEnum.Success);
    } else {
      setRemoveMsg(RemoveMyDeckResultEnum.GenericError);
    }
  };

  return (
    <>
      <PageHeaderComponent
        title="My Deck"
        subtitle="Check your pokemon and experience!"
      />
      <Container>
        <Row>
          <Col xs={12} className="mb-2">
            <div className="h5">
              Your deck is
              {myDeck.length === 0 && <> Empty</>}
              {myDeck.length < MAX_ITEM_DECK && <> to complete</>}
              {myDeck.length === MAX_ITEM_DECK && <> Full</>}(
              <span className={statusClassName}>
                {myDeck.length}/{MAX_ITEM_DECK}
              </span>
              )
            </div>
            <div>
              Your pokemon experience is {totalBaseExperience} <StarFill className="mb-1 text-primary" />
            </div>
          </Col>
          {myDeck &&
            myDeck.length > 0 &&
            myDeck.map((pokemon: PokemonDetail, index: number) => (
              <Fragment key={index}>
                <PokemonDeckCard
                  pokemon={pokemon}
                  onRemovePokemon={onRemovePokemon}
                />
              </Fragment>
            ))}
        </Row>
      </Container>
      <Modal show={showModalRemovePokemon} onHide={onCloseModalRemovePokemon}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {removeMsg === RemoveMyDeckResultEnum.Success && (
            <>Pokemon remove to your deck successfully</>
          )}
          {removeMsg === RemoveMyDeckResultEnum.ToConfirm && (
            <>
              Do you want to remove{" "}
              <b className="text-capitalize">{pokemonToRemove.name}</b> from
              your deck?
            </>
          )}
          {removeMsg === RemoveMyDeckResultEnum.GenericError && (
            <>An error occurred, try again or contact support</>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onCloseModalRemovePokemon}>
            Close
          </Button>
          {removeMsg === RemoveMyDeckResultEnum.ToConfirm && (
            <Button variant="primary" onClick={(_) => onConfirmRemovePokemon()}>
              Confirm
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
