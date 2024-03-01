import { useState, useEffect, Fragment } from "react";
import ReactPaginate from "react-paginate";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { PokemonDetail } from "../../../model/api/pokemon-detail.model";
import { PokemonCardComponent } from "./pokemon-card.components";

class PokemonListRecapComponentProps {
  pokemonDeck: PokemonDetail[];
  pokemonList: PokemonDetail[];
  isLoadingList: boolean;

  onAddPokemon(pokemon: PokemonDetail): void;
}

export function PokemonListRecapComponent({
  pokemonList,
  isLoadingList,
  pokemonDeck,

  onAddPokemon,
}: PokemonListRecapComponentProps) {
  const ITEMS_PER_PAGE: number = 4;
  const [originalList, setOriginalList] = useState<PokemonDetail[]>(null);
  const [filterList, setFilterList] = useState<PokemonDetail[]>(null);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    setOriginalList(pokemonList);
    setFilterList(pokemonList.slice(0, ITEMS_PER_PAGE));

    if (pokemonList && pokemonList.length > 0)
      setPageCount(pokemonList.length / ITEMS_PER_PAGE);
    else setPageCount(0);
  }, [pokemonList]);

  const onSelectPokemon = (pokemon: PokemonDetail): void => {
    onAddPokemon(pokemon);
  };

  const onPageChange = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % originalList.length;
    let updOriginalList = [...originalList];
    let updFilterList = updOriginalList.splice(newOffset, ITEMS_PER_PAGE);
    setFilterList(updFilterList);
  };

  return (
    <Container>
      {isLoadingList && (
        <Row>
          <Col xs={12}>
            <Spinner variant="primary" animation="border" role="status">
              <span className="visually-hidden"></span>
            </Spinner>
            We are searching...
          </Col>
        </Row>
      )}
      <Row>
        {originalList && originalList.length > 0 && (
          <Col xs={12} className="mb-3">
            We are found <b>{originalList.length}</b> pokemon.
          </Col>
        )}
        {filterList &&
          filterList.length > 0 &&
          filterList.map((pokemon: PokemonDetail, index: number) => (
            <Fragment key={index}>
              <PokemonCardComponent
                pokemon={pokemon}
                alreadyInDeck={pokemonDeck
                  ?.filter((x) => x.id === pokemon.id)
                  ?.some((x) => x)}
                onSelectPokemon={onSelectPokemon}
              />
            </Fragment>
          ))}

        {originalList && originalList.length > ITEMS_PER_PAGE && (
          <ReactPaginate
            className="pagination justify-content-center mt-4"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeLinkClassName="active"
            activeClassName=""
            breakLabel="..."
            nextLabel="next >"
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        )}
      </Row>
    </Container>
  );
}
