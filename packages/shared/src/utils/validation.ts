export const UUID_REGEX =
  /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USERNAME_REGEX =
  /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export const isUUID = (value: string) => UUID_REGEX.test(value);

export const isEmailAddress = (value: string) =>
  value ? EMAIL_REGEX.test(String(value).toLowerCase()) : false;

export const isUsername = (value: string) => USERNAME_REGEX.test(value);

export const isValidPassword = (value: string): boolean =>
  value && value.length >= 8 && value.length <= 16;

export const URL_REGEX = /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/;

export const isValidURL = (value: string) => URL_REGEX.test(value);
