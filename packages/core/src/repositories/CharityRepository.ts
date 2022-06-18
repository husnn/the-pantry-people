import { Charity } from '../entities';
import Repository from './Repository';

export interface CharityRepository extends Repository<Charity> {
  listForUser(userId: number): Promise<Charity[]>;
}

export default CharityRepository;
