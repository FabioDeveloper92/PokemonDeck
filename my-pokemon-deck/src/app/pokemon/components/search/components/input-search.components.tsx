import { FormEvent, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { PokemonBaseData } from "../../../model/api/pokemon-response.model";
import { Button, InputGroup } from "react-bootstrap";

class InputSearchComponentProps {
  pokemonBaseData: PokemonBaseData[];

  onSelectPokemon(pokemon: PokemonBaseData[]): void;
}

export function InputSearchComponent({
  pokemonBaseData,
  onSelectPokemon,
}: InputSearchComponentProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [pokemonDataFiltered, setPokemonDataFiltered] = useState<
    PokemonBaseData[]
  >([]);

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputValue(value);

    if (value && value.length > 2) {
      setPokemonDataFiltered(
        pokemonBaseData.filter((item) => item.name.includes(value))
      );
    } else {
      setPokemonDataFiltered([]);
    }
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPokemonDataFiltered([]);
    onSelectPokemon(pokemonDataFiltered);
  };

  const onClickName = (pokemon: PokemonBaseData) => {
    setInputValue(pokemon.name);
    setPokemonDataFiltered([]);

    onSelectPokemon([pokemon]);
  };

  return (
    <Form onSubmit={(e) => onSubmitForm(e)} className="w-50 mb-4 mx-auto">
      <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Search by Name">
          <Form.Control
            type="text"
            autoComplete="false"
            placeholder="Name"
            value={inputValue}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <Button type="submit">Search</Button>

        {pokemonDataFiltered && pokemonDataFiltered.length > 0 && (
          <div className="autocomplete-items">
            {pokemonDataFiltered
              .slice(0, 5)
              .map((item: PokemonBaseData, index: number) => (
                <div
                  key={index}
                  role="presentation"
                  onClick={(_) => onClickName(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.name}
                </div>
              ))}
          </div>
        )}
      </InputGroup>
    </Form>
  );
}
