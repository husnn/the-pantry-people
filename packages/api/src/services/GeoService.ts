import { GeoService as IGeoService, Result } from '@tpp/core';
import { Address, Coordinates } from '@tpp/shared';
import NodeGeocoder from 'node-geocoder';
import config from '../config';

export default class GeoService implements IGeoService {
  private geocoder: NodeGeocoder.Geocoder;

  constructor() {
    this.geocoder = NodeGeocoder({
      provider: 'google',
      apiKey: config.thirdParty.googleGeocoding
    });
  }

  parseEntry(entry: NodeGeocoder.Entry): Address {
    const {
      formattedAddress: formatted,
      streetNumber,
      streetName,
      city,
      administrativeLevels: levels,
      zipcode,
      country,
      countryCode,
      building
    } = entry;

    return {
      formatted,
      building,
      streetNumber,
      street: streetName,
      city,
      region: {
        name: levels.level2long,
        code: differentOrNull(levels.level2long, levels.level2short)
      },
      province: {
        name: levels.level1long,
        code: differentOrNull(levels.level1long, levels.level1short)
      },
      postcode: zipcode,
      country: {
        name: country,
        code: countryCode
      }
    } as Address;
  }

  async lookupAddress(addr: string): Promise<Result<Address>> {
    return this.geocoder
      .geocode(addr)
      .then((entries) => {
        if (entries.length < 1)
          throw new Error(`No entries found for address: ${addr}.`);

        return Result.ok(this.parseEntry(entries[0]));
      })
      .catch((err) => {
        return Result.fail(err);
      });
  }

  async getAddressFromCoordinates(
    coords: Coordinates
  ): Promise<Result<Address>> {
    return this.geocoder
      .reverse(coords)
      .then((entries) => {
        if (entries.length < 1)
          throw new Error(
            `No entries found for coordinates ${JSON.stringify(coords)}.`
          );

        return Result.ok(this.parseEntry(entries[0]));
      })
      .catch((err) => {
        return Result.fail(err);
      });
  }
}

const differentOrNull = (a: string, toReturn: string) =>
  a != toReturn ? toReturn : null;
