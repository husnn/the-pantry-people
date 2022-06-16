import { Charity } from '../entities';
import Repository from './Repository';

export interface CharityRepository extends Repository<Charity> {}

export default CharityRepository;
