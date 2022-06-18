import {
  GeoLookupFailureReason,
  GeoService as IGeoService,
  Result,
  WrappedError
} from '@tpp/core';
import { Address, Coordinates } from '@tpp/shared';
import axios, { Axios } from 'axios';
import NodeGeocoder from 'node-geocoder';
import config from '../config';
import { parsePostcodesCoordinates } from './postcodesio';

export default class GeoService implements IGeoService {
  private geocoder: NodeGeocoder.Geocoder;
  private postcodesClient: Axios;

  constructor() {
    this.geocoder = NodeGeocoder({
      provider: 'google',
      apiKey: config.thirdParty.googleGeocoding
    });

    this.postcodesClient = axios.create({
      baseURL: 'https://api.postcodes.io'
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
      building,
      latitude,
      longitude
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
      },
      coordinates: {
        lat: latitude,
        lon: longitude
      }
    } as Address;
  }

  async lookupAddress(addr: string): Promise<Result<Address>> {
    return this.geocoder
      .geocode(addr)
      .then((entries) => {
        if (entries.length < 1)
          return Result.fail<Address>(
            new Error(`No entries found for address: ${addr}.`),
            GeoLookupFailureReason.LOCATION_NOT_FOUND
          );

        return Result.ok(this.parseEntry(entries[0]));
      })
      .catch((err) => {
        return Result.fail(err);
      });
  }

  async lookupOutcodeGB(code: string): Promise<Result<Partial<Address>>> {
    try {
      const res = await this.postcodesClient.get(`outcodes/${code}`);
      return this.getRoughAddressFromCoordinates(
        parsePostcodesCoordinates(res.data),
        true
      );
    } catch (err) {
      return Result.fail(
        new WrappedError(err, `Could not lookup outward code: ${code}.`)
      );
    }
  }

  async lookupPostcodeGB(code: string): Promise<Result<Partial<Address>>> {
    try {
      const res = await this.postcodesClient.get(`postcodes/${code}`);
      return this.getAddressFromCoordinates(
        parsePostcodesCoordinates(res.data)
      );
    } catch (err) {
      return this.lookupOutcodeGB(code);
    }
  }

  async getRoughAddressFromCoordinates(
    coords: Coordinates,
    includeCoords = false
  ): Promise<Result<Partial<Address>>> {
    try {
      const result = await this.getAddressFromCoordinates(coords);
      if (!result.success) return Result.fail(result.error);

      const { city, region, province, country } = result.data;

      return Result.ok({
        city,
        region,
        province,
        country,
        ...(includeCoords && { coordinates: coords })
      });
    } catch (err) {
      return Result.fail(err);
    }
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
