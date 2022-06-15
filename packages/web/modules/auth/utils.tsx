import { CurrentUserDTO } from '@tpp/shared';

const AUTH_EXPIRY = 'auth_expiry';
const CURRENT_USER = 'user';

export const getAuthExpiry = (): Date => {
  const expiry = localStorage.getItem(AUTH_EXPIRY);
  if (!expiry) return new Date();

  return new Date(parseInt(expiry));
};

export const saveAuthExpiry = (exp: number) => {
  localStorage.setItem(AUTH_EXPIRY, exp.toString());
};

export const getCurrentUser = (): CurrentUserDTO | undefined => {
  let user: CurrentUserDTO | undefined;
  const data = localStorage.getItem(CURRENT_USER);

  if (data) {
    try {
      user = JSON.parse(data) as CurrentUserDTO;
    } catch (err) {
      console.log(err);
    }
  }

  return user;
};

export const saveCurrentUser = (
  props: Partial<CurrentUserDTO>
): Partial<CurrentUserDTO> => {
  let user = getCurrentUser() || {};

  user = { ...user, ...props };
  if (user && typeof user === 'object' && Object.keys(user).length > 0)
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));

  return user;
};

export const removeAuth = () => {
  localStorage.removeItem(CURRENT_USER);
};

export const isAuthExpired = () => getAuthExpiry() <= new Date();

export const shouldUnauthenticate = () => !getCurrentUser() || isAuthExpired();
