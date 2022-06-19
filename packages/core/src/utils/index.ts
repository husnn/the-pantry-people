import { randomIntBetween } from '@tpp/shared';

export const generateUserId = () =>
  randomIntBetween(Math.pow(10, 7), Math.pow(10, 8) - 1);

export const listBroadcastRadius = 3 * 1_609.344; // 3 miles
