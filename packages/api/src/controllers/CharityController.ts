import {
  AuthFailureReason,
  AuthService,
  CharityService,
  WrappedError
} from '@tpp/core';
import { CreateCharityResponse, SignupCharityResponse } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import config from '../config';
import { HttpError, HttpResponse, ValidationError } from '../http';
import logger from '../logger';

class CharityController {
  private authService: AuthService;
  private charityService: CharityService;

  constructor(authService: AuthService, charityService: CharityService) {
    this.authService = authService;
    this.charityService = charityService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, postcode } = req.body;

      const errors = validationResult(req).mapped();
      if (errors['name']) throw new ValidationError('Invalid charity name.');
      if (errors['postcode']) throw new ValidationError('Invalid postcode.');

      const result = await this.charityService.create(
        req.session.user,
        name,
        postcode
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

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name, postcode } = req.body;

      const errors = validationResult(req).mapped();
      if (errors['email']) throw new ValidationError('Invalid email address.');
      if (errors['password']) throw new ValidationError('Invalid password.');
      if (errors['name']) throw new ValidationError('Invalid charity name.');
      if (errors['postcode']) throw new ValidationError('Invalid postcode.');

      const signupResult = await this.authService.signup(
        email,
        password,
        req.ip
      );
      if (!signupResult.success) {
        if (signupResult.reason == AuthFailureReason.EMAIL_ALREADY_EXISTS)
          throw new HttpError('Email address already in use.');

        throw new WrappedError(signupResult.error, 'Could not sign up user.');
      }

      const user = signupResult.data;

      const charityResult = await this.charityService.create(
        user.id,
        name,
        postcode
      );
      if (!charityResult.success)
        throw new WrappedError(
          charityResult.error,
          'Could not create charity.'
        );

      const charity = charityResult.data;

      req.session.regenerate((err) => {
        if (err) return next(err);

        req.session.user = user.id;
        req.session.charity = charity.id;
        req.session.save((err) => {
          if (err) return next(err);

          logger.info(`User ${user.id} signed up with charity ${charity.id}.`);

          return new HttpResponse<SignupCharityResponse>(res, {
            user,
            expiry: new Date(Date.now() + config.auth.expiry).getTime(),
            charity
          });
        });
      });
    } catch (err) {
      next(err);
    }
  }
}

export default CharityController;
