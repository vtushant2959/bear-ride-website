import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,        setUser]        = useState(null);
  const [activeRole,  setActiveRoleState] = useState(null);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const storedUser  = localStorage.getItem("bearride_user");
    const storedToken = localStorage.getItem("bearride_token");
    const storedRole  = localStorage.getItem("bearride_active_role");

    if (storedUser && storedToken) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      // Active role: use stored, fall back to user's registered role
      setActiveRoleState(storedRole || parsed.role || "CUSTOMER");
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // Ensure roles is always an array
    const safeUser = {
      ...userData,
      roles: Array.isArray(userData.roles)
        ? userData.roles
        : [userData.role || "CUSTOMER"],
    };
    localStorage.setItem("bearride_user",  JSON.stringify(safeUser));
    localStorage.setItem("bearride_token", token);

    // Active role: if only one role, set it automatically
    const firstRole = safeUser.roles[0] || safeUser.role;
    const current   = localStorage.getItem("bearride_active_role");
    // Keep current active role if it's still valid for this user
    const resolvedRole = (current && safeUser.roles.includes(current)) ? current : firstRole;
    localStorage.setItem("bearride_active_role", resolvedRole);

    setUser(safeUser);
    setActiveRoleState(resolvedRole);
  };

  const logout = () => {
    localStorage.removeItem("bearride_user");
    localStorage.removeItem("bearride_token");
    localStorage.removeItem("bearride_register_data");
    localStorage.removeItem("bearride_active_role");
    setUser(null);
    setActiveRoleState(null);
    window.location.href = "/login";
  };

  // Switch which role dashboard the user is currently in
  const switchRole = (role) => {
    if (!user?.roles?.includes(role)) return;
    localStorage.setItem("bearride_active_role", role);
    setActiveRoleState(role);
  };

  const updateUser = (updatedData) => {
    const merged = {
      ...user,
      ...updatedData,
      roles: Array.isArray(updatedData.roles) ? updatedData.roles : (user?.roles || [user?.role]),
    };
    localStorage.setItem("bearride_user", JSON.stringify(merged));
    setUser(merged);
    // If new role was added, keep current active role unchanged
  };

  const refreshUser = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        const userData = response.data.user;
        const safeUser = {
          ...userData,
          roles: Array.isArray(userData.roles) ? userData.roles : [userData.role],
        };
        localStorage.setItem("bearride_user", JSON.stringify(safeUser));
        setUser(safeUser);
        // Don't change active role on refresh
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user, activeRole, loading,
      login, logout, switchRole, updateUser, refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
