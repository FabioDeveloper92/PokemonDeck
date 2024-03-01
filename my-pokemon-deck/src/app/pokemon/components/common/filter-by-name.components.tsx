import { InputSearchComponent } from "../common/input-search.components";

class FilterByNameComponentProps {
  names: string[];

  onFilterByName(value: string): void;
}

export function FilterByNameComponent({
  names,
  onFilterByName,
}: FilterByNameComponentProps) {
  const onSelectName = (value: string) => {
    onFilterByName(value);
  };

  return (
    <div className="mb-4 bg-light bg-light p-2 shadow rounded">
      <div className="text-start h6 mb-2 form-check">Filter by Name</div>
      <InputSearchComponent names={names} onSelectName={onSelectName} />
    </div>
  );
}
