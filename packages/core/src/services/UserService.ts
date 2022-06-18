import { CurrentUserDTO } from '@tpp/shared';
import { Result, WrappedError } from '../base';
import { GeoService } from '../interfaces';
import { UserRepository } from '../repositories';

export class UserService {
  private userRepository: UserRepository;

  private geoService: GeoService;

  constructor(userRepository: UserRepository, geoService: GeoService) {
    this.userRepository = userRepository;

    this.geoService = geoService;
  }

  async updateLocation(
    userId: number,
    postcode: string
  ): Promise<Result<CurrentUserDTO>> {
    try {
      const lookup = await this.geoService.lookupPostcodeGB(postcode);
      if (!lookup.success)
        return Result.fail(
          new WrappedError(lookup.error, 'Could not lookup address.'),
          lookup.reason
        );

      const result = await this.userRepository.setAddress(userId, lookup.data);
      if (!result.success)
        throw new WrappedError(
          result.error,
          'Could not update address for record.'
        );

      return Result.ok(new CurrentUserDTO(result.data));
    } catch (err) {
      return Result.fail(err);
    }
  }
}
export default UserService;
