import { randomIntBetween } from '@tpp/shared';

export const generateUserId = () =>
  randomIntBetween(Math.pow(10, 7), Math.pow(10, 8) - 1);
