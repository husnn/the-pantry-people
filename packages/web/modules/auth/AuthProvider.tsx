import { CurrentUserDTO } from '@tpp/shared';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  getCurrentUser,
  removeAuth,
  saveAuthExpiry,
  saveCurrentUser,
  shouldUnauthenticate
} from './utils';

type AuthContextProps = {
  isAuthenticated: boolean;
  currentUser: CurrentUserDTO | undefined;
  setAuthentication: (user: CurrentUserDTO, expiry: number) => void;
  clearAuth: () => void;
  redirect: (path: string) => void;
};

export const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUserDTO>();

  const router = useRouter();
  const redirect = useCallback((path: string) => router.push(path), [router]);

  const clearAuth = useCallback(() => {
    setAuthenticated(false);
    setCurrentUser(undefined);
    removeAuth();
  }, []);

  useEffect(() => {
    if (shouldUnauthenticate()) {
      clearAuth();
      return;
    }

    setAuthenticated(true);
    setCurrentUser(getCurrentUser());
  }, [clearAuth]);

  const setAuthentication = useCallback(
    (user: CurrentUserDTO, expiry: number) => {
      setCurrentUser(user);
      setAuthenticated(true);
      saveAuthExpiry(expiry);
      saveCurrentUser(user);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        setAuthentication,
        clearAuth,
        redirect
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
