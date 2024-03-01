import { useEffect, useState, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PokemonDetail } from "../../model/api/pokemon-detail.model";
import { FilterByCheckBoxValue } from "../../model/internal/filter-by-checkbox-value.model";
import { OrderBy } from "../../model/internal/order-by.model";
import { RemoveMyDeckResultEnum } from "../../model/enum/RemoveMyDeckResultEnum.enum";
import {
  getMyDeck,
  MAX_ITEM_DECK,
  removePokemonFromMyDesk,
} from "../../services/storage.service";
import { PokemonDeckCardComponent } from "./components/pokemon-deck-card.components";
import { Button, Modal } from "react-bootstrap";
import { PageHeaderComponent } from "../../../common/components/page-header.componets";
import { FilterByNameComponent } from "../common/filter-by-name.components";
import { FilterByCheckBoxComponent } from "../common/filter-by-checkbox.components";
import { OrderByComponent } from "../common/order-by.components";

export function DeckContainer() {
  const [myDeck, setMyDeck] = useState<PokemonDetail[]>([]);
  const [myDeckFilter, setMyDeckFilter] = useState<PokemonDetail[]>([]);
  const [totalBaseExperience, setTotalBaseExperience] = useState<number>(0);
  const [statusClassName, setStatusClassName] = useState<string>("");

  const [orderByValues] = useState<OrderBy[]>([
    new OrderBy("name", "Name"),
    new OrderBy("experience", "Base Experience"),
  ]);
  const [nameToFilter, setNameToFilter] = useState<string[]>(null);
  const [typeToFilter, setTypeToFilter] =
    useState<FilterByCheckBoxValue[]>(null);

  const [orderByActive, setOrderByActive] = useState<string>("name");
  const [filterByNameActive, setFilterByNameActive] = useState<string>("");
  const [filterByTypeActive, setFilterByTypeActive] =
    useState<FilterByCheckBoxValue[]>(null);

  const [pokemonToRemove, setPokemonToRemove] = useState<PokemonDetail>(null);
  const [removeMsg, setRemoveMsg] = useState<RemoveMyDeckResultEnum>(null);
  const [showModalRemovePokemon, setShowModalRemovePokemon] =
    useState<boolean>(false);

  useEffect(() => {
    loadMyDesk();
  }, []);

  function loadMyDesk() {
    let myDeckObj = getMyDeck();
    setMyDeck(myDeckObj);

    if (myDeckObj.length < MAX_ITEM_DECK) setStatusClassName("text-warning");
    else if (myDeckObj.length === MAX_ITEM_DECK)
      setStatusClassName("text-success");
    else setStatusClassName("text-danger");

    let totalBE = 0;
    if (myDeckObj && myDeckObj.length > 0) {
      totalBE = myDeckObj.map((x) => x.base_experience).reduce(reducer);
      myDeckObj = myDeckObj.sort((a, b) => a.name.localeCompare(b.name));
    }

    setTotalBaseExperience(totalBE);
    setMyDeckFilter(myDeckObj);

    prepareFilterValues(myDeckObj);
  }

  function prepareFilterValues(myDeckObj: PokemonDetail[]) {
    let updFilterByTypes: FilterByCheckBoxValue[] = [];
    let updFilterByNames: string[] = [];

    if (myDeckObj && myDeckObj.length > 0) {
      updFilterByTypes = myDeckObj
        .map((x) => x.types)
        .reduce(function (a: FilterByCheckBoxValue[], b) {
          if (a.length === 0)
            return b.map(
              (x) =>
                new FilterByCheckBoxValue(
                  x.type.name.replace(" ", ""),
                  x.type.name
                )
            );

          const missingItems = b
            .filter((x) =>
              a.every((y) => y.id !== x.type.name.replace(" ", ""))
            )
            .map(
              (x) =>
                new FilterByCheckBoxValue(
                  x.type.name.replace(" ", ""),
                  x.type.name
                )
            );

          return missingItems.length > 0 ? a.concat(missingItems) : a;
        }, [])
        .sort((a, b) => a.value.localeCompare(b.value));

      updFilterByNames = myDeckObj.map((x) => x.name).sort();
    }

    setNameToFilter(updFilterByNames);
    setTypeToFilter(updFilterByTypes);
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

  const onSelectedTypes = (selectedValues: FilterByCheckBoxValue[]) => {
    setFilterByTypeActive(selectedValues);
    filterMyDeck(selectedValues, filterByNameActive, orderByActive);
  };

  const onChangeOrderBy = (value: string) => {
    setOrderByActive(value);
    filterMyDeck(filterByTypeActive, filterByNameActive, value);
  };

  const onFilterByName = (value: string) => {
    setFilterByNameActive(value);
    filterMyDeck(filterByTypeActive, value, orderByActive);
  };

  const filterMyDeck = (
    filterByType: FilterByCheckBoxValue[],
    filterByName: string,
    orderBy: string
  ) => {
    let updFilterItems = [...myDeck];
    if (filterByType && filterByType.length > 0) {
      updFilterItems = updFilterItems.filter((x) =>
        x.types.some((t) =>
          filterByType.some((f) => f.id === t.type.name.replace(" ", ""))
        )
      );
    }

    if (updFilterItems.length > 0 && filterByName) {
      updFilterItems = updFilterItems.filter((x) =>
        x.name.includes(filterByName)
      );
    }

    if (updFilterItems.length > 0 && orderBy) {
      if (orderBy === "experience") {
        updFilterItems.sort((a, b) => a.base_experience - b.base_experience);
      } else {
        updFilterItems.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    setMyDeckFilter(updFilterItems);
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
            <div>Your pokemon experience is {totalBaseExperience}</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <OrderByComponent
              values={orderByValues}
              onChangeOrderBy={onChangeOrderBy}
            />
            <FilterByNameComponent
              names={nameToFilter}
              onFilterByName={onFilterByName}
            />
            <FilterByCheckBoxComponent
              title="Types"
              values={typeToFilter}
              onSelected={onSelectedTypes}
            />
          </Col>
          <Col xs={12} md={9}>
            {myDeckFilter && (
              <Row className="m-0">
                {myDeckFilter.map((pokemon, index) => (
                  <Fragment key={index}>
                    <PokemonDeckCardComponent
                      pokemon={pokemon}
                      onRemovePokemon={onRemovePokemon}
                    />
                  </Fragment>
                ))}
              </Row>
            )}
            {(!myDeckFilter || myDeckFilter.length === 0) && (
              <>Not pokemon found this search</>
            )}
          </Col>
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
