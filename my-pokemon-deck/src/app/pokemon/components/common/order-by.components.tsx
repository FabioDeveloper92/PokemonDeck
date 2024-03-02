import { Form } from "react-bootstrap";
import { OrderBy } from "../../model/internal/order-by.model";

class OrderByComponentProps {
  values: OrderBy[];

  onChangeOrderBy(value: string): void;
}

export function OrderByComponent({
  values,
  onChangeOrderBy,
}: OrderByComponentProps) {
  const onChangeSelect = (event) => {
    onChangeOrderBy(event.target.value);
  };

  return (
    <>
      {values && values.length > 0 && (
        <div className="mb-4">
          <Form.Select
            className="text-capitalize fw-light text-start mb-2"
            onChange={(e) => onChangeSelect(e)}
          >
            {values.map((value, index) => (
              <option key={index} value={value.id}>
                {value.value}
              </option>
            ))}
          </Form.Select>
        </div>
      )}
    </>
  );
}
