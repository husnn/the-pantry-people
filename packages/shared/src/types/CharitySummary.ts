import { AssignedListDTO, ListDTO } from '../dto';

export type CharitySummary = {
  available: ListDTO[];
  processing: AssignedListDTO[];
  completed: AssignedListDTO[];
};
