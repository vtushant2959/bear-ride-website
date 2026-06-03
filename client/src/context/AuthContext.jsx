import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("bearride_user");
    const storedToken = localStorage.getItem("bearride_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("bearride_user", JSON.stringify(userData));
    localStorage.setItem("bearride_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("bearride_user");
    localStorage.removeItem("bearride_token");
    localStorage.removeItem("bearride_register_data");
    setUser(null);
    window.location.href = "/login";
  };

  const updateUser = (updatedData) => {
    const merged = { ...user, ...updatedData };
    localStorage.setItem("bearride_user", JSON.stringify(merged));
    setUser(merged);
  };

  const refreshUser = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        const userData = response.data.user;
        localStorage.setItem("bearride_user", JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
