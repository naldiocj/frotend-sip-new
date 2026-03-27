"use client";

import { ROLES } from "@/lib/constants";
import { User } from "@/lib/dto/user.dto";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

/**
 * The shape of our UserContext value.
 */
export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  isDirector: boolean;
  isInstrutor: boolean;
  isSecretaria: boolean;
  isPGR: boolean;
  isPiquete: boolean;
  isPending: boolean;
}

/**
 * Create a context with an undefined default value.
 * The provider will set a valid value before any component can access it.
 */
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

/**
 * Context provider component for user authentication state.
 *
 * @param children - The components that will have access to the UserContext.
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const roles = (user && user.roles) || [];

  const isAdmin = roles.some((r) => r.name === ROLES.ADMIN);
  const isDirector = roles.some(
    (r) => r.name === ROLES.DIRECTOR && roles.length === 1,
  );
  const isInstrutor = roles.some(
    (r) => r.name === ROLES.INSTRUTOR && roles.length === 1,
  );
  const isSecretaria = roles.some(
    (r) => r.name === ROLES.SECRETARIA && roles.length === 1,
  );
  const isPGR = roles.some((r) => r.name === ROLES.PGR && roles.length === 1);
  const isPiquete = roles.some(
    (r) => r.name === ROLES.PIQUETE && roles.length === 1,
  );

  // Load stored user on mount
  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch { }
    }
  }, []);

  // Sync to localStorage and redirect when null
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      // Antes de remover, verifica se existe user no localStorage.
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        // Atualiza se necessário (aqui você pode customizar a atualização se precisar).
        setUser(JSON.parse(storedUser));
        return;
      }

      // Checa se existe o access_token nos cookies antes de remover o user do localStorage.
      // Note: No client, só é possível acessar cookies com document.cookie
      const hasAccessToken = document.cookie
        .split(";")
        .some((cookie) => cookie.trim().startsWith("access_token="));

      if (hasAccessToken) {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          return;
        }
      }

      localStorage.removeItem("currentUser");
    }
  }, [user, pathname, router]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        isDirector,
        isInstrutor,
        isSecretaria,
        isPGR,
        isPiquete,
        isPending,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to consume the UserContext.
 *
 * @returns { user, setUser } tuple containing the current user and a setter.
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
