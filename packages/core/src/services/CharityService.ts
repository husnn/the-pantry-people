import { CharityDTO, ID } from '@tpp/shared';
import { Point } from 'geojson';
import { Result } from '../base';
import { Charity } from '../entities';
import { CharityRepository, UserRepository } from '../repositories';

export class CharityService {
  private userRepository: UserRepository;
  private charityRepository: CharityRepository;

  constructor(
    userRepository: UserRepository,
    charityRepository: CharityRepository
  ) {
    this.userRepository = userRepository;
    this.charityRepository = charityRepository;
  }

  async create(
    userId: ID,
    name: string,
    coordinates?: Point
  ): Promise<Result<CharityDTO>> {
    try {
      const user = await this.userRepository.get(userId);
      if (!user) return Result.fail();

      const charity = await this.charityRepository.create({
        owner: user,
        name,
        coordinates
      } as Charity);

      return Result.ok(new CharityDTO(charity));
    } catch (err) {
      return Result.fail(err);
    }
  }
}
export default CharityService;
