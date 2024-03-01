import { Fragment } from "react";
import { EvolvesTo } from "../../../model/api/pokemon-evolutions.model";
import { PokemonEvolutionsCardComponent } from "./pokemon-evolution-card.components";
import { CaretRight, CaretDown } from "react-bootstrap-icons";

class PokemonEvolveToComponentProps {
  evolvesTo: EvolvesTo[];
}

export function PokemonEvolveToComponent({
  evolvesTo,
}: PokemonEvolveToComponentProps) {
  return (
    <>
      {evolvesTo && (
        <>
          {evolvesTo.map((evo, index) => (
            <Fragment key={index}>
              <li>
                <div className="h-100 d-flex align-items-center justify-content-center">
                  <div className="d-none d-sm-none d-md-block">
                    <CaretRight className="h3" />
                  </div>
                  <div className="d-md-none">
                    <CaretDown className="h3" />
                  </div>
                </div>
              </li>
              <PokemonEvolutionsCardComponent species={evo.species} />
              {evo.evolves_to && (
                <PokemonEvolveToComponent evolvesTo={evo.evolves_to} />
              )}
            </Fragment>
          ))}
        </>
      )}
    </>
  );
}
