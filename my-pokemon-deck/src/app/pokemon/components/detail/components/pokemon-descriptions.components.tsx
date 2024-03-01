import { useState, useEffect } from "react";
import {
  FlavorTextEntry,
  PokemonSpecies,
} from "../../../model/api/pokemon-species.model";
import { Dropdown } from "react-bootstrap";

class PokemonDescriptionsComponentProps {
  species: PokemonSpecies;
}

export function PokemonDescriptionsComponent({
  species,
}: PokemonDescriptionsComponentProps) {
  const [pokemonVersionSpecies, setPokemonVersionSpecies] =
    useState<FlavorTextEntry[]>(null);
  const [pokemonVersionSpeciesSelect, setPokemonVersionSpeciesSelect] =
    useState<FlavorTextEntry>(null);

  useEffect(() => {
    if (species && species.flavor_text_entries) {
      setPokemonVersionSpecies(species.flavor_text_entries);
      setPokemonVersionSpeciesSelect(species.flavor_text_entries[0]);
    }
  }, [species]);

  const onChangePokemonVersionSpeciesSelect = (
    version: FlavorTextEntry
  ): void => {
    setPokemonVersionSpeciesSelect(version);
  };

  return (
    <>
      {pokemonVersionSpecies && (
        <div>
          <Dropdown>
            <span className="me-2">Version </span>
            <Dropdown.Toggle variant="success" id="dropdown-version-species">
              {pokemonVersionSpeciesSelect.version?.name ?? "N.D."}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {pokemonVersionSpecies.map((version, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={(_) => onChangePokemonVersionSpeciesSelect(version)}
                >
                  {version.version.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <p className="text-start mt-2">{pokemonVersionSpeciesSelect.flavor_text}</p>
        </div>
      )}
    </>
  );
}
