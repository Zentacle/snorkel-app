export interface LocationSearchInitialValues {
  search_term?: string;
}

export interface InitialSearchValues extends LocationSearchInitialValues {
  difficulty?: string;
  preference?: string;
  entry?: string;
  max_depth?: number;
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
}
