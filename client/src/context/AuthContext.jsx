import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,       setUser]            = useState(null);
  const [activeRole, setActiveRoleState] = useState(null);
  // Start loading=true so ProtectedRoutes shows "Loading..." while we read localStorage.
  // This prevents the brief user=null flash that caused the redirect loop.
  const [loading,    setLoading]         = useState(true);

  // ── Bootstrap from localStorage ──────────────────────────────────────────
  useEffect(() => {
    const storedUser  = localStorage.getItem("bearride_user");
    const storedToken = localStorage.getItem("bearride_token");
    const storedRole  = localStorage.getItem("bearride_active_role");

    if (storedUser && storedToken) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setActiveRoleState(storedRole || parsed.role || "CUSTOMER");
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem("bearride_user");
        localStorage.removeItem("bearride_token");
        localStorage.removeItem("bearride_active_role");
      }
    }
    setLoading(false);
  }, []);

  // ── Listen for 401 events dispatched by api.js interceptor ───────────────
  useEffect(() => {
    const onUnauthorised = () => {
      // Clear React state — ProtectedRoutes will then redirect to /login
      // via <Navigate>, without a full page reload.
      setUser(null);
      setActiveRoleState(null);
    };
    window.addEventListener("auth:unauthorised", onUnauthorised);
    return () => window.removeEventListener("auth:unauthorised", onUnauthorised);
  }, []);

  // ── Auth actions ──────────────────────────────────────────────────────────
  const login = (userData, token) => {
    const safeUser = {
      ...userData,
      roles: Array.isArray(userData.roles) ? userData.roles : [userData.role || "CUSTOMER"],
    };
    localStorage.setItem("bearride_user",  JSON.stringify(safeUser));
    localStorage.setItem("bearride_token", token);

    const firstRole    = safeUser.roles[0] || safeUser.role;
    const current      = localStorage.getItem("bearride_active_role");
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
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, activeRole, loading, login, logout, switchRole, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
