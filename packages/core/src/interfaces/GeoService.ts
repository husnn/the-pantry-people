import { Address, Coordinates } from '@tpp/shared';
import { Result } from '../base';

export interface GeoService {
  lookupAddress(addr: string): Promise<Result<Address>>;
  getAddressFromCoordinates(coords: Coordinates): Promise<Result<Address>>;
}
