import { GetInventoryRequest, GetInventoryResponse, Item } from '@tpp/shared';
import { ApiClient } from '../http';

export const getInventory = () =>
  ApiClient()
    .request<GetInventoryResponse, GetInventoryRequest>({
      method: 'GET',
      endpoint: '/items',
      authentication: 'optional'
    })
    .then((res) => res.items);
