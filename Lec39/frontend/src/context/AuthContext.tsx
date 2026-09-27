"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, tokenStorage } from "@/lib/api";
import type { User } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  refresh: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadUser(): Promise<User | null> {
  if (!tokenStorage.get()) return null;
  try {
    return await api.currentUser();
  } catch {
    // ტოკენი ვადაგასული ან არასწორია
    tokenStorage.clear();
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setUser(await loadUser());
  }, []);

  useEffect(() => {
    let active = true;
    loadUser().then((u) => {
      if (!active) return;
      setUser(u);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const token = await api.signIn({ email, password });
      tokenStorage.set(token);
      await refresh();
    },
    [refresh],
  );

  // backend-ს logout არ აქვს — უბრალოდ ტოკენს ვშლით ბრაუზერიდან
  const signOut = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, refresh, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
