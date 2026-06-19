import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { mockUsers } from "../data/users";
import type { MockUser } from "../data/users";

function loadStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem("app_users") || "[]") as MockUser[];
  } catch {
    return [];
  }
}

interface AuthContextType {
  user: MockUser | null;
  login: (email: string, password: string) => boolean;
  logout: (onLogout?: () => void) => void;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  const login = (email: string, password: string): boolean => {
    const mockFound = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (mockFound) {
      setUser(mockFound);
      return true;
    }

    const registeredUsers = loadStoredUsers();
    const registered = registeredUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (registered) {
      setUser(registered);
      return true;
    }

    return false;
  };

  const logout = (onLogout?: () => void) => {
    setUser(null);
    onLogout?.();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
