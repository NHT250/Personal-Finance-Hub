import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (nextUser, token) => {
    localStorage.setItem('pfh_token', token || 'demo-token');
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('pfh_token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
