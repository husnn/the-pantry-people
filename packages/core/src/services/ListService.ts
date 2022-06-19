import { Item, ListDTO } from '@tpp/shared';
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
import { GeoLookupFailureReason } from './errors';

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
        return Result.fail(null, GeoLookupFailureReason.MISSING_COORDINATES);

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

  async listForCharity(charityId: number): Promise<Result<ListDTO[]>> {
    try {
      const charity = await this.charityRepository.get(charityId);
      if (!charity) return Result.fail();
      if (!charity.coordinates)
        return Result.fail(null, GeoLookupFailureReason.MISSING_COORDINATES);

      const lists = await this.listRepository.listWithinArea(
        charity.coordinates
      );

      return Result.ok(lists.map((l) => new ListDTO(l)));
    } catch (err) {
      console.log(err);
      return Result.fail(err);
    }
  }
}
export default ListService;
