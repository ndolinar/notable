export type CategoryType = string;

export interface CategoriesState {
  loading: false;
  error: 'string ' | null;
  status: string;
  categories: CategoryType[];
}
