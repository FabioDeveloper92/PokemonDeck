import { PokemonEvolutions } from "../../../model/api/pokemon-evolutions.model";
import { PokemonEvolveToComponent } from "./pokemon-evolve-to.components";
import { PokemonEvolutionsCardComponent } from "./pokemon-evolution-card.components";

class PokemonEvolutionsComponentProps {
  evolutions: PokemonEvolutions;
}

export function PokemonEvolutionsComponent({
  evolutions,
}: PokemonEvolutionsComponentProps) {
  return (
    <>
      {evolutions && (
        <>
          <div className="mb-2 text-start h4">Evolutions</div>
          <ul className="list-group list-group-horizontal-md d-md-inline-flex">
            <PokemonEvolutionsCardComponent
              species={evolutions.chain.species}
            />
            <PokemonEvolveToComponent evolvesTo={evolutions.chain.evolves_to} />
          </ul>
        </>
      )}
    </>
  );
}
