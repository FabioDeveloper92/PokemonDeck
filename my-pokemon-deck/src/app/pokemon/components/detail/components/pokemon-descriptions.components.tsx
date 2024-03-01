import { PokemonSpecies } from "../../../model/api/pokemon-species.model";

class PokemonDescriptionsComponentProps {
  species: PokemonSpecies;
}

export function PokemonDescriptionsComponent({
  species,
}: PokemonDescriptionsComponentProps) {
  return (
    <>
      {species && species.flavor_text_entries.length > 0 && (
        <p className="text-start mt-2">
          {species.flavor_text_entries[0].flavor_text}
        </p>
      )}
    </>
  );
}
