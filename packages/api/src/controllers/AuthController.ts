import { AuthFailureReason, AuthService, WrappedError } from '@tpp/core';
import { LoginResponse, SignupResponse } from '@tpp/shared';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import config from '../config';
import { HttpError, HttpResponse, ValidationError } from '../http';
import logger from '../logger';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req).mapped();

      if (errors['email']) throw new ValidationError('Invalid email address.');
      if (errors['password']) throw new ValidationError('Invalid password.');

      const result = await this.authService.signup(email, password, req.ip);
      if (!result.success)
        throw new WrappedError(result.error, 'Could not sign up user.');

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

      req.session.regenerate((err) => {
        if (err) return next(err);

        req.session.user = user.id;
        req.session.save((err) => {
          if (err) return next(err);

          logger.info(`User ${user.id} logged in.`);

          return new HttpResponse<LoginResponse>(res, {
            user,
            expiry: new Date(Date.now() + config.auth.expiry).getTime()
          });
        });
      });
    } catch (err) {
      next(err);
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
