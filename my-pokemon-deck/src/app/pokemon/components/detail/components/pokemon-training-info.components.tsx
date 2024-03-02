import { Col, ProgressBar, Row } from "react-bootstrap";
import { PokemonSpecies } from "../../../model/api/pokemon-species.model";
import { PokemonTypesTypeComponent } from "./pokemon-types-type.components";
import { Type } from "../../../model/api/pokemon-detail.model";

class PokemonTrainingInfoComponentProps {
  strengths: Type[];
  weakness: Type[];
  species: PokemonSpecies;
}

export function PokemonTrainingInfoComponent({
  strengths,
  weakness,
  species,
}: PokemonTrainingInfoComponentProps) {
  const renderTitle = (title: string) => {
    return <div className="h6 mb-1 text-black text-capitalize">{title ?? "Unknow"}</div>;
  };

  const renderRarity = () => {
    let value = "Common";
    if (species) {
      if (species.is_baby) value = "Common Baby";
      if (species.is_legendary) value = "Legendary";
      if (species.is_mythical) value = "Mythical";
    }

    return value;
  };

  return (
    <>
      <Row className="m-0">
        <Col xs={6}>
          {renderTitle("Rarity")}
          {renderRarity()}
        </Col>

        <Col xs={6} className="mb-2 text-capitalize">
          {renderTitle("Growth Rate")} {species.growth_rate.name}
        </Col>

        <Col xs={12} className="mb-2">
          <span className="h6 mb-1 text-black">Base Friendship</span>
          <ProgressBar
            className="progressbar-label-start border"
            now={species?.base_happiness ?? 0}
            label={`${species?.base_happiness ?? 0} / 255`}
            max={255}
          ></ProgressBar>
        </Col>
        <Col xs={12} className="mb-2">
          {renderTitle("Capture rate")}
          <ProgressBar
            className="progressbar-label-start border"
            variant="info"
            now={species?.capture_rate ?? 0}
            label={`${species?.capture_rate ?? 0} / 255`}
            max={255}
          ></ProgressBar>
        </Col>
      </Row>
      <Row className="mx-0 mt-1">
        <Col xs={12}>
          <PokemonTypesTypeComponent types={strengths} title="Strengths" />
        </Col>
        <Col xs={12}>
          <PokemonTypesTypeComponent types={weakness} title="Weakness" />
        </Col>
      </Row>
    </>
  );
}
