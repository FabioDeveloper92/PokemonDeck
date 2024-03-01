export class FilterByCheckBoxValue {
  id: string;
  value: string;
  isSelected: boolean = false;

  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
}
