import React, { createContext, useContext, useMemo } from 'react';
import { IContextProps } from './types';

export interface AuthContextProps {
  user: any | null;
  setUser: React.Dispatch<any>;
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<IContextProps> = ({ children }) => {
  const [user, setUser] = React.useState<any>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextProps {
  const authContext = useContext(AuthContext);
  return { ...authContext };
}
