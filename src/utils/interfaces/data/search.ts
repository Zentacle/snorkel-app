export interface LocationSearchInitialValues {
  search_term?: string;
}

export interface InitialSearchValues extends LocationSearchInitialValues {
  difficulty?: string;
  preference?: string;
  entry?: string;
  sort?: string;
}

export interface AutocompleteResponse {
  label: string;
  type: string;
  url: string;
}

export interface TypeaheadResponse {
  id: number;
  text: string;
  type: string;
  url: string;
  subtext: string;
}
