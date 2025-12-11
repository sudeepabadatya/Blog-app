/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { storage } from "../utils/storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = storage.get(storage.keys.AUTH, null);
    if (saved) setUser(saved);
  }, []);

  const signIn = (emailOrPayload) => {
    const payload =
      typeof emailOrPayload === "string"
        ? { email: emailOrPayload }
        : emailOrPayload ?? {};

    const id =
      payload.id ??
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString());
    const u = {
      id,
      email: payload.email,
      name: payload.name ?? payload.email?.split("@")[0] ?? "User",
    };
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
