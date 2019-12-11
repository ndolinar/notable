import { CategoryType } from '../categories/categoriesTypes';

export interface NoteType {
  id: number;
  title: string;
  categories: CategoryType[];
  mood: string;
  date: Date;
  createdAt?: Date; // @todo: Do I need to send this when updating?
  modifiedAt?: Date; // @todo: Do I need to send this when updating?
}

export interface NoteState {
  id: number;
  loading: boolean;
  error: string | null;
  status: string;
  notes: NoteType[];
}
