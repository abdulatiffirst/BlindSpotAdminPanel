import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  const value = useMemo(
    () => ({
      user,
      login: (email, pass) => signInWithEmailAndPassword(auth, email, pass),
      logout: () => signOut(auth),
    }),
    [user],
  );
  return (
    <Ctx.Provider value={value}>
      {user === undefined ? null : children}
    </Ctx.Provider>
  );
}
