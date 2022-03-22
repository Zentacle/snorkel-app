export interface LocationSearchInitialValues {
  location?: string;
}

export interface InitialSearchValues extends LocationSearchInitialValues {
  difficulty?: string;
  preference?: string;
  entry?: string;
  maxDepth?: number;
}
