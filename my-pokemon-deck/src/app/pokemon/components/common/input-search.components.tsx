import { useState, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Search } from "react-bootstrap-icons";
import { Button, InputGroup } from "react-bootstrap";

class InputSearchComponentProps {
  names: string[];

  onSelectName(value: string): void;
}

export function InputSearchComponent({
  names,
  onSelectName,
}: InputSearchComponentProps) {
  const searchResultsContainer = useRef(null);

  const [showSuggestionsPanel, setShowSuggestionsPanel] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [namesFiltered, setNamesFiltered] = useState<string[]>([]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  const onFocusInput = () => {
    setShowSuggestionsPanel(true);
  };

  const handleOutsideClick = (event) => {
    if (
      searchResultsContainer?.current &&
      !searchResultsContainer.current.contains(event.target)
    )
      setShowSuggestionsPanel(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputValue(value);

    if (value && value.length > 2) {
      setNamesFiltered(names.filter((item) => item.includes(value)));

      if (!showSuggestionsPanel) setShowSuggestionsPanel(true);
    } else {
      if (showSuggestionsPanel) setShowSuggestionsPanel(false);
    }
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (showSuggestionsPanel) setShowSuggestionsPanel(false);

    onSelectName(inputValue);
  };

  const onClickName = (value: string) => {
    setInputValue(value);
    setNamesFiltered(names.filter((item) => item.includes(value)));

    if (showSuggestionsPanel) setShowSuggestionsPanel(false);

    onSelectName(value);
  };

  return (
    <Form ref={searchResultsContainer} onSubmit={(e) => onSubmitForm(e)}>
      <InputGroup>
        <FloatingLabel controlId="floatingInput" label="Search by Name">
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="Name"
            value={inputValue}
            onFocus={(_) => onFocusInput()}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <Button type="submit">
          <Search />
        </Button>

        {showSuggestionsPanel && namesFiltered && namesFiltered.length > 0 && (
          <div className="autocomplete-items">
            {namesFiltered.slice(0, 5).map((item, index) => (
              <div
                key={index}
                role="presentation"
                onClick={(_) => onClickName(item)}
                style={{ cursor: "pointer" }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </InputGroup>
    </Form>
  );
}
