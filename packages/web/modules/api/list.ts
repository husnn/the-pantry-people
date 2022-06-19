import { CreateListRequest, CreateListResponse, Item } from '@tpp/shared';
import { ApiClient } from '../http';

export const createList = (items: Item[]) =>
  ApiClient().request<CreateListResponse, CreateListRequest>({
    method: 'POST',
    endpoint: '/lists',
    authentication: 'required',
    body: {
      items
    }
  });
