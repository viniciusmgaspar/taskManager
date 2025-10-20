import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any;
  setUser: (u: any) => void;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  function parseJwt(token: string | null) {
    if (!token) return null;
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;
      const payload = parts[1];
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        "="
      );
      const decoded = atob(padded);
      return JSON.parse(
        decodeURIComponent(
          decoded
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );
    } catch (e) {
      console.warn("Failed to parse JWT", e);
      return null;
    }
  }

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const parsed = parseJwt(token);
      if (parsed) setUser(parsed);
    } else {
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  async function login(email: string, password: string) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
    const parsed = parseJwt(data.access_token);

    if (parsed) setUser(parsed);
    navigate("/tasks");
  }

  async function register(name: string, email: string, password: string) {
    await api.post("/auth/register", { name, email, password });
    navigate("/");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
