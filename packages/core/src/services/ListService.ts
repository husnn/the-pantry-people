import { AssignedListDTO, Item, ListDTO, ListState } from '@tpp/shared';
import circleToPolygon from 'circle-to-polygon';
import { Result } from '../base';
import { List, ListItem } from '../entities';
import { GeoService } from '../interfaces';
import {
  CharityRepository,
  ListRepository,
  UserRepository
} from '../repositories';
import { listBroadcastRadius } from '../utils';
import { GeoLookupFailureReason, ListUpdateFailureReason } from './errors';

export class ListService {
  private userRepository: UserRepository;
  private charityRepository: CharityRepository;
  private listRepository: ListRepository;

  private geoService: GeoService;

  constructor(
    userRepository: UserRepository,
    charityRepository: CharityRepository,
    listRepository: ListRepository,
    geoService: GeoService
  ) {
    this.userRepository = userRepository;
    this.charityRepository = charityRepository;
    this.listRepository = listRepository;

    this.geoService = geoService;
  }

  async create(beneficiaryId: number, items: Item[]): Promise<Result<ListDTO>> {
    try {
      const beneficiary = await this.userRepository.get(beneficiaryId);
      if (!beneficiary) return Result.fail();
      if (!beneficiary.coordinates)
        return Result.fail(
          new Error('Missing coordinates.'),
          GeoLookupFailureReason.MISSING_COORDINATES
        );

      const list = await this.listRepository.create({
        beneficiaryId,
        items: items.map(
          (i) =>
            new ListItem({
              label: i.label,
              quantity: i.quantity
            })
        ),
        area: circleToPolygon(
          beneficiary.coordinates.coordinates,
          listBroadcastRadius
        )
      } as List);

      return Result.ok(new ListDTO(list));
    } catch (err) {
      return Result.fail(err);
    }
  }

  async listForCharity(charityId: number): Promise<
    Result<{
      available: ListDTO[];
      processing: AssignedListDTO[];
      completed: AssignedListDTO[];
    }>
  > {
    try {
      const charity = await this.charityRepository.get(charityId);
      if (!charity) return Result.fail();
      if (!charity.coordinates)
        return Result.fail(null, GeoLookupFailureReason.MISSING_COORDINATES);

      const available = await this.listRepository.listWithinArea(
        charity.coordinates
      );

      const assigned = await this.listRepository.listByCharity(charity.id);

      return Result.ok({
        available: available.map((i) => new ListDTO(i)),
        processing: assigned
          .filter((i) => i.status == ListState.PROCESSING)
          .map((i) => new AssignedListDTO(i)),
        completed: assigned
          .filter(
            (i) =>
              i.status == ListState.FULFILLED ||
              i.status == ListState.PARTLY_FULFILLED
          )
          .map((i) => new AssignedListDTO(i))
      });
    } catch (err) {
      console.log(err);
      return Result.fail(err);
    }
  }

  async listForUser(userId: number): Promise<Result<ListDTO[]>> {
    try {
      const lists = await this.listRepository.listByBeneficiary(userId);
      return Result.ok(lists.map((l) => new ListDTO(l)));
    } catch (err) {
      console.log(err);
      return Result.fail(err);
    }
  }

  async pickup(
    charityId: number,
    listId: number
  ): Promise<Result<AssignedListDTO>> {
    try {
      let list = await this.listRepository.get(listId);
      if (!list) throw new Error('Could not find given list.');

      list.charityId = charityId;
      list.status = ListState.PROCESSING;

      list = await this.listRepository.update(list);

      return Result.ok(new AssignedListDTO(list));
    } catch (err) {
      return Result.fail(err);
    }
  }

  async fulfill(
    charityId: number,
    listId: number
  ): Promise<Result<AssignedListDTO>> {
    try {
      let list = await this.listRepository.get(listId);
      if (!list || list.charityId != charityId)
        throw new Error('Could not find given list.');

      list.status = ListState.FULFILLED;

      list = await this.listRepository.update(list);

      return Result.ok(new AssignedListDTO(list));
    } catch (err) {
      return Result.fail(err);
    }
  }

  async close(
    charityId: number,
    listId: number
  ): Promise<Result<AssignedListDTO>> {
    try {
      let list = await this.listRepository.get(listId);
      if (!list || list.charityId != charityId)
        throw new Error('Could not find given list.');
      if (
        list.status != ListState.FULFILLED &&
        list.status != ListState.PARTLY_FULFILLED
      )
        return Result.fail(
          new Error('Wrong state.'),
          ListUpdateFailureReason.ILLEGAL_STATE_CHANGE
        );

      list.status = ListState.CLOSED;

      list = await this.listRepository.update(list);

      return Result.ok(new AssignedListDTO(list));
    } catch (err) {
      return Result.fail(err);
    }
  }
}
export default ListService;
