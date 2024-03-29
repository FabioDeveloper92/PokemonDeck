import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PokemonCarouselComponent } from "./components/pokemon-carousel.components";
import { getPokemonDetailFromMyDeck } from "../../services/storage.service";
import { Link, useParams } from "react-router-dom";
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
import { Spinner } from "react-bootstrap";
import { PokemonTrainingInfoComponent } from "./components/pokemon-training-info.components";
import { Search } from "react-bootstrap-icons";
import { MAX_SKILL_VALUE } from "../../model/constant/app.constant";

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

  useEffect(() => {
    if (pokemonSpecies?.evolution_chain?.url) {
      const init = async (id: number) => {
        const pokemonEvo = await makeAPICall<PokemonEvolutions>(
          pokemonSpecies.evolution_chain.url
        );
        setPokemonEvolutions(pokemonEvo);
      };

      init(pokemonDetail.id);
    } else {
      setPokemonEvolutions(null);
    }
  }, [pokemonSpecies]);

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
        >
          <Button variant="primary mt-2">
            <Link to="/pokedex" className="text-decoration-none text-white">
              <Search className="mb-md-1 me-2" /> Research
            </Link>
          </Button>
        </PageHeaderComponent>
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
              className="text-start d-flex align-items-stretch mt-2"
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
            <Col
              xs="12"
              sm={12}
              md={6}
              className="text-start d-flex align-items-stretch"
            >
              <div className="w-100">
                <PokemonStatsComponent
                  title="Stats"
                  stats={pokemonDetail.stats}
                  maxStats={MAX_SKILL_VALUE}
                />
              </div>
            </Col>

            <Col
              xs="12"
              sm={12}
              md={6}
              className="text-start d-flex align-items-stretch"
            >
              <div className="w-100">
                <PokemonTrainingInfoComponent
                  strengths={pokemonStrengths}
                  weakness={pokemonWeakness}
                  species={pokemonSpecies}
                />
              </div>
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
