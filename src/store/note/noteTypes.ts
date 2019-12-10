export interface NoteState {
  loading: boolean;
  error: string | undefined;
  status: string;
  note: Note;
}

export interface Note {
  title: string;
  categories: string[];
  mood: string;
  date: string;
  createdAt: string; // @todo: Do I need to send this when updating?
  modifiedAt: string; // @todo: Do I need to send this when updating?
}
