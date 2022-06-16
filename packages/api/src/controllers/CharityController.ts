import {
  CharityRepository,
  CharityService,
  UserRepository,
  WrappedError
} from '@tpp/core';
import { coordinatesToPoint, CreateCharityResponse } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpResponse, ValidationError } from '../http';

class CharityController {
  private charityService: CharityService;

  constructor(
    userRepository: UserRepository,
    charityRepository: CharityRepository
  ) {
    this.charityService = new CharityService(userRepository, charityRepository);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, coordinates } = req.body;

      const errors = validationResult(req).mapped();
      if (errors['name']) throw new ValidationError('Invalid charity name.');
      if (errors['coordinates'])
        throw new ValidationError('Invalid location coordinates.');

      const result = await this.charityService.create(
        req.session.user,
        name,
        coordinatesToPoint(coordinates)
      );
      if (!result.success)
        throw new WrappedError(result.error, 'Could not create charity.');

      req.session.charity = result.data.id;
      req.session.save((err) => {
        if (err) return next(err);

        return new HttpResponse<CreateCharityResponse>(res, {
          charity: result.data
        });
      });
    } catch (err) {
      next(err);
    }
  }
}

export default CharityController;
