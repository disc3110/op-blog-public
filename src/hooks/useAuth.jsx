import { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getCurrentUser,
  logout as apiLogout,
  clearToken,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        // no valid token, ignore
        clearToken();
        setUser(null);
      } finally {
        setInitializing(false);
      }
    }

    init();
  }, []);

  async function login(email, password) {
    const { user } = await apiLogin({ email, password });
    setUser(user);
    return user;
  }

  async function register(name, email, password) {
    const { user } = await apiRegister({ name, email, password });
    setUser(user);
    return user;
  }

  function logout() {
    apiLogout();
    setUser(null);
  }

  const value = {
    user,
    initializing,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}