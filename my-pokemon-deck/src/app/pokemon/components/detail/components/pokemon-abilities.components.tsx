import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import {
  Ability,
  PokemonDetail,
} from "../../../model/api/pokemon-detail.model";
import { InfoCircleFill } from "react-bootstrap-icons";
import { makeAPICall } from "../../../services/generic.service";
import { PokemonAbility } from "../../../model/api/pokemon-ability.model";
import { PokemonSpecies } from "../../../model/api/pokemon-species.model";
import { GenderMale, GenderFemale, Ban } from "react-bootstrap-icons";

class PokemonAbilitiesComponentProps {
  pokemonDetail: PokemonDetail;
  pokemonSpecies: PokemonSpecies;
}

export function PokemonAbilitiesComponent({
  pokemonDetail,
  pokemonSpecies,
}: PokemonAbilitiesComponentProps) {
  const [pokemonAbilityToShow, setPokemonAbilityToShow] =
    useState<string>(null);
  const [pokemonAbility, setPokemonAbility] = useState<string>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const renderTitle = (title: string) => {
    return <div className="h6 mb-1 text-black">{title}</div>;
  };

  const renderGender = () => {
    if (!pokemonSpecies) return renderValue("N.D.");

    if (pokemonSpecies.gender_rate === -1) {
      return (
        <span className="text-capitalize fw-bold">
          <Ban title="Genderless" />
        </span>
      );
    }

    if (pokemonSpecies.gender_rate === 0) {
      return (
          <span className="text-capitalize fw-bold">
            <GenderMale title="Male" />
          </span>
      );
    }

    if (pokemonSpecies.gender_rate === 8) {
      return (
          <span className="text-capitalize fw-bold">
            <GenderFemale title="Female" />
          </span>
      );
    }

    if (!pokemonSpecies.has_gender_differences) {
      return (
        <>
          <span className="text-capitalize fw-bold">
            <GenderMale title="Male" className="me-2" />
            <GenderFemale title="Female" />
          </span>
        </>
      );
    }

    return renderValue("N.D.");
  };

  const renderValue = (value: any) => {
    return <span className="text-capitalize fw-bold">{value}</span>;
  };

  const onOpenAbilities = (ability: Ability) => {
    setPokemonAbilityToShow(ability.ability.name.replace("-", " "));

    const getAbilityDescription = async (abilityToSearch: Ability) => {
      const pokemonAbility = (await makeAPICall(
        abilityToSearch.ability.url
      )) as PokemonAbility;

      if (
        pokemonAbility.flavor_text_entries &&
        pokemonAbility.flavor_text_entries.length > 0
      ) {
        let ability = pokemonAbility.flavor_text_entries.filter(
          (x) => x.language.name === "en"
        )[0].flavor_text;

        setPokemonAbility(ability);
      } else {
        setPokemonAbility(null);
      }

      setShowModal(true);
    };

    getAbilityDescription(ability);
  };

  const onCloseTooltip = () => {
    setShowModal(false);
  };

  return (
    <Row className="bg-primary opacity-75 text-white rounded py-4">
      <Col xs={6}>
        <Row>
          <Col xs={12} className="mb-2">
            {renderTitle("Height")}
            {renderValue(pokemonDetail.height)}
          </Col>
          <Col xs={12} className="mb-2">
            {renderTitle("Weight")}
            {renderValue(`${pokemonDetail.weight} lbs`)}
          </Col>
          <Col xs={12} className="mb-2">
            {renderTitle("Gender")}
            {renderGender()}
          </Col>
        </Row>
      </Col>
      <Col xs={6}>
        <Row>
          <Col xs={12} className="mb-2">
            {renderTitle("Base Experience")}
            {renderValue(pokemonDetail.base_experience)}
          </Col>
          <Col xs={12} className="mb-2">
            {renderTitle("Category")}
            {pokemonSpecies && pokemonSpecies.genera.length > 0
              ? pokemonSpecies.genera.map((genera, index) => (
                  <div key={index}>{renderValue(genera.genus)}</div>
                ))
              : "N.D."}
          </Col>
          <Col xs={12} className="mb-2">
            {renderTitle("Abilities")}
            {pokemonDetail.abilities.map((ability, index) => (
              <div key={index}>
                {renderValue(ability.ability.name.replace("-", " "))}
                <small
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={(_) => {
                    onOpenAbilities(ability);
                  }}
                >
                  <InfoCircleFill className="mb-1" />
                </small>
              </div>
            ))}
          </Col>
        </Row>
      </Col>
      <Modal show={showModal} onHide={onCloseTooltip}>
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">
            {pokemonAbilityToShow}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{pokemonAbility ?? "Not Available"}</Modal.Body>
      </Modal>
    </Row>
  );
}
