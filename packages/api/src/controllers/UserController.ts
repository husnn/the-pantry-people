import {
  GeoLookupFailureReason,
  GeoService,
  UserRepository,
  UserService,
  WrappedError
} from '@tpp/core';
import { UpdateLocationResponse } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpError, HttpResponse, ValidationError } from '../http';

class UserController {
  private userService: UserService;

  constructor(userRepository: UserRepository, geoService: GeoService) {
    this.userService = new UserService(userRepository, geoService);
  }

  async updateLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { postcode } = req.body;

      const errors = validationResult(req).mapped();
      if (errors['postcode']) throw new ValidationError('Invalid post code.');

      const result = await this.userService.updateLocation(
        req.session.user,
        postcode
      );
      if (!result.success) {
        if (result.reason == GeoLookupFailureReason.LOCATION_NOT_FOUND) {
          throw new HttpError('Could not find any given location.');
        }

        throw new WrappedError(result.error, 'Could not update address.');
      }

      return new HttpResponse<UpdateLocationResponse>(res, {
        user: result.data
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
