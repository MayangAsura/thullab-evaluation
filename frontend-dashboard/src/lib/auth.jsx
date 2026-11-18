import { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem("edu_forge_user_info");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("edu_forge_token");
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("edu_forge_user_info", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("edu_forge_user_info");
    }
  }, [userInfo]);
  useEffect(() => {
    if (token) {
      localStorage.setItem("edu_forge_token", token);
    } else {
      localStorage.removeItem("edu_forge_token");
    }
  }, [token]);
  const login = async (emailOrUsername, password) => {
    setLoading(true);
    try {
      const payload = emailOrUsername.includes("@") ? { email: emailOrUsername, password } : { username: emailOrUsername, password };
      const response = await api.post("/login", payload);
      const { token: receivedToken, userInfo: receivedUser } = response.data;
      setToken(receivedToken);
      setUserInfo(receivedUser);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Login gagal, silakan coba lagi.";
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/register", { name, email, password });
      const { token: receivedToken, userInfo: receivedUser } = response.data;
      setToken(receivedToken);
      setUserInfo(receivedUser);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Registrasi gagal, silakan coba lagi.";
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setToken(null);
    setUserInfo(null);
  };
  const updateProfile = (updated) => {
    setUserInfo((prev) => prev ? { ...prev, ...updated } : null);
  };
  return <AuthContext.Provider
    value={{
      userInfo,
      token,
      loading,
      login,
      register,
      logout,
      updateProfile
    }}
  >
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
