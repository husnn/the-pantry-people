import {
  CreateListRequest,
  CreateListResponse,
  ListItemDTO
} from '@tpp/shared';
import { ApiClient } from '../http';

export const createList = (items: ListItemDTO[]) =>
  ApiClient().request<CreateListResponse, CreateListRequest>({
    method: 'POST',
    endpoint: '/lists',
    authentication: 'required',
    body: {
      items
    }
  });
