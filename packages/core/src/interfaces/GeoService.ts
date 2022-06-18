import { Address, Coordinates } from '@tpp/shared';
import { Result } from '../base';

export interface GeoService {
  lookupAddress(addr: string): Promise<Result<Address>>;
  lookupPostcodeGB(code: string): Promise<Result<Partial<Address>>>;
  getAddressFromCoordinates(
    coords: Coordinates,
    rough?: boolean
  ): Promise<Result<Address>>;
}
