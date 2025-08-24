import axios from 'axios';
import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTHENTICATE_STATUS,
  CREATE_USER,
  AXIOS_ERROR,
  AXIOS_START,
  AUTH_STATUS,
  GET_USER_BY_TOKEN
} from '../actionTypes';

export const authStatus = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/auth/status", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: AUTH_STATUS, payload: data });
    return { success: true, data };
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error.response?.data || error.message });
    return { success: false, message: error.response?.data || error.message };
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: AXIOS_START });
    const res = await axios.post('/api/auth/login', user);

    // Guardar token en localStorage
    localStorage.setItem("token", res.data.token);

    // Guardar usuario en Redux
    dispatch({ type: LOGIN_USER, payload: res.data });

    return { success: true, data: res.data };
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    dispatch({ type: AXIOS_ERROR, payload: message });
    return { success: false, message };
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', user);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: CREATE_USER, payload: res.data });

    return { success: true, data: res.data };
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed";
    dispatch({ type: AXIOS_ERROR, payload: message });
    return { success: false, message };
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT_USER });
};

export const authenticateStatus = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/status', {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: AUTHENTICATE_STATUS, payload: res.data });
    return { success: true, data: res.data };
  } catch (error) {
    if (error.response?.data === 'token expired') {
      localStorage.removeItem("token");
    }
    const message = error.response?.data?.message || "Authentication failed";
    dispatch({ type: AXIOS_ERROR, payload: message });
    return { success: false, message };
  }
};

export const getUserByToken = (token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({
        type: GET_USER_BY_TOKEN,
        payload: res.data,
      });

      return res.data; // Para que el hook pueda usarlo directamente
    } catch (error) {
      console.error("Error al obtener usuario por token:", error);
      return null;
    }
  };
};