import { createContext, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (userData) => {
    try {
      setLoading(true);
      setError("");

      const data = await authService.register(userData);
      setUser(data);

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      setLoading(true);
      setError("");

      const data = await authService.login(userData);
      setUser(data);

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};