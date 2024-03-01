import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PokemonCarouselComponent } from "./components/pokemon-carousel.components";
import { getPokemonDetailFromMyDeck } from "../../services/storage.service";
import { useParams } from "react-router-dom";
import { PokemonDetail } from "../../model/api/pokemon-detail.model";
import {
  getPokemonEvolutions,
  getPokemonSpecies,
} from "../../services/pokemon.service";
import { PokemonSpecies } from "../../model/api/pokemon-species.model";
import { PokemonTypesComponent } from "../common/pokemon-types.components";
import { PokemonDescriptionsComponent } from "./components/pokemon-descriptions.components";
import { PokemonAbilitiesComponent } from "./components/pokemon-abilities.components";
import { PokemonStatsComponent } from "./components/pokemon-stats.components";
import { PokemonEvolutionsComponent } from "./components/pokemon-evolutions.components";
import { PokemonEvolutions } from "../../model/api/pokemon-evolutions.model";
import { makeAPICall } from "../../services/generic.service";
import { PokemonDetailTitleComponent } from "./components/pokemon-detail-title.components";

export function DetailContainer() {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>(null);
  const [pokemonEvolutions, setPokemonEvolutions] =
    useState<PokemonEvolutions>(null);

  const params = useParams();

  useEffect(() => {
    const myPokemon = getPokemonDetailFromMyDeck(Number(params.id));
    setPokemonDetail(myPokemon);

    const init = async (id: number) => {
      const pokemonSpec = await getPokemonSpecies(id, "en");
      let pokemonEvo = await makeAPICall(pokemonSpec.evolution_chain.url);

      setPokemonSpecies(pokemonSpec);
      setPokemonEvolutions(pokemonEvo as PokemonEvolutions);
    };
    init(myPokemon.id);
  }, []);

  return (
    <Container className="mt-3 mb-3">
      {pokemonDetail && (
        <>
          <Row>
            <Col xs="12" sm={12} md={5}>
              <PokemonCarouselComponent
                name={pokemonDetail.name}
                sprites={pokemonDetail.sprites}
              />
            </Col>
            <Col xs="12" sm={12} md={7} className="text-start">
              <PokemonTypesComponent types={pokemonDetail.types} />
              <PokemonDetailTitleComponent
                pokemon={pokemonDetail}
                titleType="h3"
              />
              <PokemonAbilitiesComponent pokemonDetail={pokemonDetail} pokemonSpecies={pokemonSpecies} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs="12" sm={12} md={6}>
              <PokemonStatsComponent stats={pokemonDetail.stats} />
            </Col>
            <Col xs="12" sm={12} md={6}>
              <PokemonDescriptionsComponent species={pokemonSpecies} />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm={12} md={12}>
              <PokemonEvolutionsComponent evolutions={pokemonEvolutions} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
