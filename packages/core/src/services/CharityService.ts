import { CharityDTO, Coordinates, coordinatesToPoint, ID } from '@tpp/shared';
import { Result, WrappedError } from '../base';
import { Charity } from '../entities';
import { GeoService } from '../interfaces';
import { CharityRepository, UserRepository } from '../repositories';

export class CharityService {
  private userRepository: UserRepository;
  private charityRepository: CharityRepository;

  private geoService: GeoService;

  constructor(
    userRepository: UserRepository,
    charityRepository: CharityRepository,
    geoService: GeoService
  ) {
    this.userRepository = userRepository;
    this.charityRepository = charityRepository;

    this.geoService = geoService;
  }

  async create(
    userId: ID,
    name: string,
    coordinates?: Coordinates
  ): Promise<Result<CharityDTO>> {
    try {
      const user = await this.userRepository.get(userId);
      if (!user) return Result.fail();

      const addressLookup = await this.geoService.getAddressFromCoordinates(
        coordinates
      );
      if (!addressLookup.success)
        return Result.fail(
          new WrappedError(
            addressLookup.error,
            'Could not lookup address for given coordinates.'
          )
        );

      const charity = await this.charityRepository.create({
        owner: user,
        name,
        address: addressLookup.data,
        coordinates: coordinatesToPoint(coordinates)
      } as Charity);

      return Result.ok(new CharityDTO(charity));
    } catch (err) {
      return Result.fail(err);
    }
  }
}
export default CharityService;
