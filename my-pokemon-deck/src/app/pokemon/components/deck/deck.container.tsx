import { useEffect, useState, Fragment } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { PokemonDetail, Stat } from "../../model/api/pokemon-detail.model";
import { FilterByCheckBoxValue } from "../../model/internal/filter-by-checkbox-value.model";
import { OrderBy } from "../../model/internal/order-by.model";
import { RemoveMyDeckResultEnum } from "../../model/enum/RemoveMyDeckResultEnum.enum";
import {
  getMyDeck,
  removeAllPokemonFromMyDesk,
  removePokemonFromMyDesk,
} from "../../services/storage.service";
import { PokemonDeckCardComponent } from "./components/pokemon-deck-card.components";
import { PokemonStatsComponent } from "../detail/components/pokemon-stats.components";
import { PageHeaderComponent } from "../../../common/components/page-header.componets";
import { FilterByNameComponent } from "../common/filter-by-name.components";
import { FilterByCheckBoxComponent } from "../common/filter-by-checkbox.components";
import { OrderByComponent } from "../common/order-by.components";
import { DeckBaseInfoComponent } from "./components/deck-base-info.components";
import { Search, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ClearDeckModalComponent } from "./components/clear-deck-modal.components";
import { RemovePokemonModalComponent } from "./components/remove-pokemon-modal.components";

export function DeckContainer() {
  const [myDeck, setMyDeck] = useState<PokemonDetail[]>([]);
  const [myDeckFilter, setMyDeckFilter] = useState<PokemonDetail[]>([]);
  const [totalBaseExperience, setTotalBaseExperience] = useState<number>(0);

  const [orderByValues] = useState<OrderBy[]>([
    new OrderBy("name", "Name"),
    new OrderBy("experience", "Base Experience"),
  ]);

  const [maxTotalStats, setMaxTotalStats] = useState<number>(0);
  const [totalDeckStats, setTotalDeckStats] = useState<Stat[]>(null);
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
  const [showModalClearDeck, setShowModalClearDeck] = useState<boolean>(false);
  const [clearDeckMsg, setClearDeckMsg] = useState<string>("");

  useEffect(() => {
    loadMyDeck();
  }, []);

  const loadMyDeck = () => {
    let myDeckObj = getMyDeck();
    setMyDeck(myDeckObj);

    calculateBaseInfo(myDeckObj);
    prepareFilterValues(myDeckObj);
  };

  function calculateBaseInfo(myDeckObj: PokemonDetail[]) {
    if (myDeckObj) {
      let totalBE = 0;
      let totalDeckStat: Stat[] = [];
      if (myDeckObj && myDeckObj.length > 0) {
        totalBE = myDeckObj
          .map((x) => x.base_experience)
          .reduce(
            (accumulator: number, currentValue: number, index: number) => {
              const returns = accumulator + currentValue;
              return returns;
            }
          );

        myDeckObj
          .map((x) => x.stats)
          .reduce(function (a, b) {
            return a.concat(b);
          }, [])
          .forEach((item) => {
            let updItem = totalDeckStat.find(
              (x) => x.stat.name === item.stat.name
            );

            if (updItem) {
              updItem.base_stat += item.base_stat;
            } else {
              totalDeckStat.push(item);
            }
          });

        myDeckObj = myDeckObj.sort((a, b) => a.name.localeCompare(b.name));
      }

      setMyDeckFilter(myDeckObj);
      setTotalBaseExperience(totalBE);
      setMaxTotalStats(100 * myDeckObj.length);
      setTotalDeckStats(totalDeckStat);
    }
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
      loadMyDeck();
      setRemoveMsg(RemoveMyDeckResultEnum.Success);
    } else {
      setRemoveMsg(RemoveMyDeckResultEnum.GenericError);
    }
  };

  const onOpenModalClearDeck = () => {
    setShowModalClearDeck(true);
    setClearDeckMsg(null);
  };

  const onCloseModalClearDeck = () => {
    setShowModalClearDeck(false);
    setPokemonToRemove(null);
  };

  const onConfirmClearDeck = () => {
    let result = removeAllPokemonFromMyDesk();
    if (result) {
      loadMyDeck();
      setClearDeckMsg("Remove all cards.");
    } else {
      setClearDeckMsg("An error occurred, try again or contact support");
    }
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

  return (
    <>
      <PageHeaderComponent
        title="My Deck"
        subtitle="Check your pokemon and experience!"
      />
      <Container>
        {myDeck && myDeck.length > 0 && (
          <>
            <Row>
              <Col xs={12} md={3}>
                <div className="mb-4 bg-light p-2 shadow rounded">
                  <DeckBaseInfoComponent
                    totalBaseExperience={totalBaseExperience}
                    deckCardNumber={myDeck.length}
                  />
                </div>
                <div className="mb-4 bg-light p-2 shadow rounded">
                  <PokemonStatsComponent
                    title="Deck Stats"
                    customTitleClass="text-start h6 mb-2 form-check"
                    stats={totalDeckStats}
                    maxStats={maxTotalStats}
                  />
                </div>
                <FilterByCheckBoxComponent
                  title="Types"
                  values={typeToFilter}
                  onSelected={onSelectedTypes}
                />
              </Col>
              <Col xs={12} md={9}>
                <Row className="m-0">
                  <Col xs="12" md={6}>
                    <FilterByNameComponent
                      names={nameToFilter}
                      onFilterByName={onFilterByName}
                    />
                  </Col>
                  <Col xs="12" md={4}>
                    <OrderByComponent
                      values={orderByValues}
                      onChangeOrderBy={onChangeOrderBy}
                    />
                  </Col>
                  <Col xs="12" md={2}>
                    <Button
                      variant="outline-danger"
                      onClick={(_) => onOpenModalClearDeck()}
                    >
                      <Trash className="mb-md-1" /> Clear
                    </Button>
                  </Col>
                </Row>
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
                  <>Not pokemon found in this search</>
                )}
              </Col>
            </Row>
          </>
        )}
        {(!myDeck || myDeck.length === 0) && (
          <>
            <div className="h5 fw-normal">
              Your deck is empty, go to home and collect all
            </div>
            <div>
              <Button variant="primary mt-2">
                <Link to="/" className="text-decoration-none text-white">
                  <Search className="mb-md-1 me-2" /> Start collect
                </Link>
              </Button>
            </div>
          </>
        )}
      </Container>

      <ClearDeckModalComponent
        showModal={showModalClearDeck}
        message={clearDeckMsg}
        onConfirm={onConfirmClearDeck}
        onClose={onCloseModalClearDeck}
      />

      <RemovePokemonModalComponent
        showModal={showModalRemovePokemon}
        message={removeMsg}
        pokemonToRemove={pokemonToRemove}
        onConfirm={onConfirmRemovePokemon}
        onClose={onCloseModalRemovePokemon}
      />
    </>
  );
}
