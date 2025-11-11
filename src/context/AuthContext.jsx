/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = storage.get(storage.keys.AUTH, null);
    if (saved) setUser(saved);
  }, []);

  const signIn = (email) => {
    const u = { email };
    setUser(u);
    storage.set(storage.keys.AUTH, u);
  };

  const signOut = () => {
    setUser(null);
    storage.remove(storage.keys.AUTH);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

