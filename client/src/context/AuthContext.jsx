import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  authenticateStatus,
  getUserByToken,
  registerUser // 👈 Nueva acción
} from "../redux/actions/authActions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isAuth, loading, error } = useSelector((state) => state);
  const [initialized, setInitialized] = useState(false);

  // Restaurar sesión en el primer render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(authenticateStatus(storedToken)).then((res) => {
        if (res?.success || res?.role) {
          dispatch(getUserByToken(storedToken));
        }
      });
    }
    setInitialized(true);
  }, [dispatch]);

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    if (result.success && result.data?.token) {
      dispatch(getUserByToken(result.data.token));
    }
    return result;
  };

  const register = async (userData) => {
    const result = await dispatch(registerUser(userData));
    if (result.success && result.data?.token) {
      dispatch(getUserByToken(result.data.token));
    }
    return result;
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuth,
        isAdmin,
        loading,
        error,
        initialized,
        login,
        register, // 👈 ahora está disponible en el contexto
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
