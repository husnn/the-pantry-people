import { Charity, CharityRepository as ICharityRepository } from '@tpp/core';
import CharitySchema from '../schemas/CharitySchema';
import Repository from './Repository';

export class CharityRepository
  extends Repository<Charity>
  implements ICharityRepository
{
  constructor() {
    super(CharitySchema);
  }
}

export default CharityRepository;
