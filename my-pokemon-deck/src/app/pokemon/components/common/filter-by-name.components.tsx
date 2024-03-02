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
    <div className="mb-4">
      <InputSearchComponent
        names={names}
        onSelectName={onSelectName}
        exactlyMatch={false}
      />
    </div>
  );
}
