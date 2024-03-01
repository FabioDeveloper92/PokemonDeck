import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { FilterByCheckBoxValue } from "../../model/internal/filter-by-checkbox-value.model";

class FilterByCheckBoxComponentProps {
  title: string;
  values: FilterByCheckBoxValue[];

  onSelected(selectedValues: FilterByCheckBoxValue[]): void;
}

export function FilterByCheckBoxComponent({
  title,
  values,
  onSelected,
}: FilterByCheckBoxComponentProps) {
  const [filterValues, setFilterValues] = useState<FilterByCheckBoxValue[]>([]);

  useEffect(() => {
    if (values) setFilterValues([...values]);
  }, [values]);

  const onClickSelect = (id: string, event) => {
    let updFilterValues = [...filterValues];

    const index = updFilterValues.findIndex((x) => x.id === id);
    updFilterValues[index].isSelected = event.target.checked;

    setFilterValues(updFilterValues);

    onSelected(filterValues.filter((x) => x.isSelected));
  };

  return (
    <>
      {filterValues && filterValues.length > 0 && (
        <div className="mb-4 bg-light bg-light p-2 shadow rounded">
          <div className="text-start h6 mb-2 form-check">{title}</div>
          <Form>
            {filterValues.map((val, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={`filter-by-name-${title.replace(" ", "")}-${val.id}`}
                label={`${val.value}`}
                className="text-capitalize fw-light text-start mb-2"
                checked={val.isSelected}
                onChange={(e) => onClickSelect(val.id, e)}
              />
            ))}
          </Form>
        </div>
      )}
    </>
  );
}
