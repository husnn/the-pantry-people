import {
  CloseListRequest,
  CloseListResponse,
  CreateListRequest,
  CreateListResponse,
  GetOwnListsRequests,
  GetOwnListsResponse,
  Item,
  PickupListRequest,
  PickupListResponse
} from '@tpp/shared';
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

export const pickupList = (id: number) =>
  ApiClient().request<PickupListResponse, PickupListRequest>({
    method: 'POST',
    endpoint: `/lists/${id}/pickup`,
    authentication: 'required'
  });

export const fulfillList = (id: number) =>
  ApiClient().request<PickupListResponse, PickupListRequest>({
    method: 'POST',
    endpoint: `/lists/${id}/complete`,
    authentication: 'required'
  });

export const closeList = (id: number) =>
  ApiClient().request<CloseListResponse, CloseListRequest>({
    method: 'POST',
    endpoint: `/lists/${id}/close`,
    authentication: 'required'
  });

export const getOwnLists = () =>
  ApiClient().request<GetOwnListsResponse, GetOwnListsRequests>({
    method: 'GET',
    endpoint: `/lists`,
    authentication: 'required'
  });
