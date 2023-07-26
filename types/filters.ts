export interface ISelectable {
  id: number;
  title: string;
}

interface ISex extends ISelectable {
  title: "Любой" | "Мужской" | "Женский";
}

export const genders: ISex[] = [
  { id: 0, title: "Любой" },
  { id: 1, title: "Женский" },
  { id: 2, title: "Мужской" },
];

export interface IFilters {
  sex?: ISex;
  city?: ISelectable;
  max_age?: number;
  min_age?: number;
  isSkipDeleted: boolean;
  isSkipClosed: boolean;
}
