import axios from "axios";

// Action Types
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_ROLE = "UPDATE_USER_ROLE";
export const GET_AUTH_USER = "GET_AUTH_USER";
export const USER_ERROR = "USER_ERROR";

// Actions

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users");
    dispatch({ type: GET_ALL_USERS, payload: data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response?.data || error.message });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch({ type: GET_USER_BY_ID, payload: data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response?.data || error.message });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/users/${id}`, userData);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response?.data || error.message });
  }
};

export const updateUserRole = (id, role) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/users/${id}/role?role=${role}`);
    dispatch({ type: UPDATE_USER_ROLE, payload: data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response?.data || error.message });
  }
};

export const getAuthUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch({ type: GET_AUTH_USER, payload: data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response?.data || error.message });
  }
};
