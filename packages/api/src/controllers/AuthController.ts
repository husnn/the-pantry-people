import {
  AuthFailureReason,
  AuthService,
  CharityService,
  Result,
  UserService,
  WrappedError
} from '@tpp/core';
import { CharityDTO, LoginResponse, SignupResponse } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import config from '../config';
import { HttpError, HttpResponse, ValidationError } from '../http';
import logger from '../logger';

class AuthController {
  private authService: AuthService;
  private userService: UserService;
  private charityService: CharityService;

  constructor(
    authService: AuthService,
    userService: UserService,
    charityService: CharityService
  ) {
    this.authService = authService;
    this.userService = userService;
    this.charityService = charityService;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, postcode } = req.body;

      const errors = validationResult(req).mapped();

      if (errors['firstName']) throw new ValidationError('Missing first name.');
      if (errors['lastName']) throw new ValidationError('Missing last name.');
      if (errors['email']) throw new ValidationError('Invalid email address.');
      if (errors['password']) throw new ValidationError('Invalid password.');
      if (errors['postcode']) throw new ValidationError('Invalid postcode.');

      const result = await this.authService.signup(
        email,
        password,
        req.ip,
        postcode,
        firstName,
        lastName
      );
      if (!result.success) {
        if (result.reason == AuthFailureReason.EMAIL_ALREADY_EXISTS)
          throw new HttpError('Email address already in use.', 400);

        throw new WrappedError(result.error, 'Could not sign up user.');
      }

      const user = result.data;

      req.session.regenerate((err) => {
        if (err) return next(err);

        req.session.user = user.id;
        req.session.save((err) => {
          if (err) return next(err);

          logger.info(`User ${user.id} signed up.`);

          return new HttpResponse<SignupResponse>(res, {
            user,
            expiry: new Date(Date.now() + config.auth.expiry).getTime()
          });
        });
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req).mapped();

      if (errors['email']) throw new ValidationError('Invalid email address.');
      if (errors['password']) throw new ValidationError('Invalid password.');

      const result = await this.authService.login(email, password, req.ip);
      if (!result.success) {
        switch (result.reason) {
          case AuthFailureReason.USER_NOT_FOUND:
          case AuthFailureReason.INCORRECT_PASSWORD:
            throw new HttpError('Incorrect email or password.', 403);
        }

        throw new WrappedError(result.error, 'Could not login.');
      }

      const user = result.data;

      const charityResult = await this.getCharityForUser(user.id);
      if (!charityResult.success) logger.error(charityResult.error);

      req.session.regenerate((err) => {
        if (err) return next(err);

        req.session.user = user.id;
        req.session.charity = charityResult.data?.id;

        req.session.save((err) => {
          if (err) return next(err);

          logger.info(
            `User ${user.id} logged in${
              req.session.charity ? ` for charity ${req.session.charity}` : ''
            }.`
          );

          return new HttpResponse<LoginResponse>(res, {
            user,
            expiry: new Date(Date.now() + config.auth.expiry).getTime(),
            charity: charityResult.data
          });
        });
      });
    } catch (err) {
      next(err);
    }
  }

  async getCharityForUser(
    userId: number
  ): Promise<Result<CharityDTO | undefined>> {
    try {
      const result = await this.charityService.listForUser(userId);
      if (!result.success)
        throw new WrappedError(
          result.error,
          'Error listing charities for user.'
        );

      return Result.ok(result.data.length > 0 ? result.data[0] : undefined);
    } catch (err) {
      return Result.fail(err);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.session.user;

      req.session.destroy((err) => {
        if (err) return next(err);

        logger.info(`User ${userId} signed out.`);
        return new HttpResponse(res);
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
