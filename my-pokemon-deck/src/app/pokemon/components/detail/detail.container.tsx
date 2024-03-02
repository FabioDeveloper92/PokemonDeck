import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PokemonCarouselComponent } from "./components/pokemon-carousel.components";
import { getPokemonDetailFromMyDeck } from "../../services/storage.service";
import { useParams } from "react-router-dom";
import {
  PokemonDetail,
  Type,
  TypeInfo,
} from "../../model/api/pokemon-detail.model";
import { PokemonType } from "../../model/api/pokemon-type.model";
import {
  getPokemonDetail,
  getPokemonDetailById,
  getPokemonSpecies,
} from "../../services/pokemon.service";
import { PokemonSpecies } from "../../model/api/pokemon-species.model";
import { PokemonDescriptionsComponent } from "./components/pokemon-descriptions.components";
import { PokemonBaseInfoComponent } from "./components/pokemon-base-info.components";
import { PokemonStatsComponent } from "./components/pokemon-stats.components";
import { PokemonEvolutionsComponent } from "./components/pokemon-evolutions.components";
import { PokemonEvolutions } from "../../model/api/pokemon-evolutions.model";
import {
  makeAPICall,
  makeMultipleAPICalls,
} from "../../services/generic.service";
import { PokemonDetailTitleComponent } from "./components/pokemon-detail-title.components";
import { PageHeaderComponent } from "../../../common/components/page-header.componets";
import { PokemonTypesTypeComponent } from "./components/pokemon-types-type.components";
import { Spinner } from "react-bootstrap";

export function DetailContainer() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>(null);
  const [pokemonWeakness, setPokemonWeakness] = useState<Type[]>(null);
  const [pokemonStrengths, setPokemonStrengths] = useState<Type[]>(null);
  const [pokemonEvolutions, setPokemonEvolutions] =
    useState<PokemonEvolutions>(null);

  const params = useParams();

  useEffect(() => {
    setIsLoading(true);

    const init = async (id: number) => {
      const pokemonSpec = await getPokemonSpecies(id, "en");
      if (
        pokemonSpec &&
        pokemonSpec.evolution_chain &&
        pokemonSpec.evolution_chain.url
      ) {
        const pokemonEvo = await makeAPICall<PokemonEvolutions>(
          pokemonSpec.evolution_chain.url
        );
        setPokemonEvolutions(pokemonEvo);
      } else {
        setPokemonEvolutions(null);
      }

      setPokemonSpecies(pokemonSpec);

      setIsLoading(false);
    };

    const pokemonId = Number(params.id);
    if (pokemonId) {
      const myPokemon = getPokemonDetailFromMyDeck(pokemonId);
      if (myPokemon) {
        setPokemonDetail(myPokemon);
        init(myPokemon.id);
      } else {
        const getPokemon = async (id: number) => {
          const myPokemon = await getPokemonDetailById(id);
          setPokemonDetail(myPokemon);

          if (myPokemon) init(myPokemon.id);
          else setIsLoading(false);
        };
        getPokemon(pokemonId);
      }
    } else {
      const getPokemonByName = async (name: string) => {
        const myPokemon = await getPokemonDetail(name);
        setPokemonDetail(myPokemon);

        if (myPokemon) init(myPokemon.id);
        else setIsLoading(false);
      };
      getPokemonByName(params.id);
    }

    window.scrollTo(0, 0);
  }, [params]);

  useEffect(() => {
    if (pokemonDetail) {
      const multipleAPICalls = async () => {
        const pokemonTps = await makeMultipleAPICalls<PokemonType>(
          pokemonDetail.types.map((x) => x.type.url)
        );

        let weakness = pokemonTps.reduce(function (a: Type[], b) {
          if (a.length === 0)
            return b.damage_relations.double_damage_from.map(
              (x) => new Type(0, new TypeInfo(x.name, x.url))
            );

          const missingItems = b.damage_relations.double_damage_from
            .filter((x) => a.every((y) => y.type.name !== x.name))
            .map((x) => new Type(0, new TypeInfo(x.name, x.url)));

          return missingItems.length > 0 ? a.concat(missingItems) : a;
        }, []);

        let strengths = pokemonTps.reduce(function (a: Type[], b) {
          if (a.length === 0)
            return b.damage_relations.double_damage_to.map(
              (x) => new Type(0, new TypeInfo(x.name, x.url))
            );

          const missingItems = b.damage_relations.double_damage_to
            .filter((x) => a.every((y) => y.type.name !== x.name))
            .map((x) => new Type(0, new TypeInfo(x.name, x.url)));

          return missingItems.length > 0 ? a.concat(missingItems) : a;
        }, []);

        setPokemonWeakness(weakness);
        setPokemonStrengths(strengths);
      };

      multipleAPICalls();
    }
  }, [pokemonDetail]);

  return (
    <>
      {isLoading && (
        <PageHeaderComponent
          title="Pokemon Search"
          subtitle="We search your pokemon..."
        >
          <Spinner variant="primary" animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </PageHeaderComponent>
      )}
      {!pokemonDetail && !isLoading && (
        <PageHeaderComponent
          title="Pokemon not found"
          subtitle="Sorry but this pokemon doesn't exist"
        />
      )}
      {pokemonDetail && !isLoading && (
        <Container className="mt-3 mb-3">
          <Row>
            <Col xs="12" sm={12} md={5} className="d-flex align-items-stretch">
              <div className="w-100">
                <PokemonCarouselComponent
                  name={pokemonDetail.name}
                  sprites={pokemonDetail.sprites}
                />
              </div>
            </Col>
            <Col
              xs="12"
              sm={12}
              md={7}
              className="text-start d-flex align-items-stretch"
            >
              <div className="w-100">
                <PokemonDetailTitleComponent
                  pokemon={pokemonDetail}
                  titleType="h3"
                />

                <PokemonDescriptionsComponent species={pokemonSpecies} />

                <PokemonBaseInfoComponent
                  pokemonDetail={pokemonDetail}
                  pokemonSpecies={pokemonSpecies}
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-3 mb-3 bg-light shadow rounded">
            <Col xs="12" sm={12} md={6}>
              <PokemonStatsComponent
                title="Stats"
                stats={pokemonDetail.stats}
                maxStats={180}
              />
            </Col>

            <Col xs="12" sm={12} md={6}>
              <PokemonTypesTypeComponent
                types={pokemonStrengths}
                title="Strengths"
              />
              <PokemonTypesTypeComponent
                types={pokemonWeakness}
                title="Weakness"
              />
            </Col>
          </Row>
          <Row className="bg-light shadow rounded">
            <Col xs="12" sm={12} md={12}>
              <PokemonEvolutionsComponent evolutions={pokemonEvolutions} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
