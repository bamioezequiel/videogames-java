import axios from "axios";
import {
  GET_ORDERS,
  GET_ORDER_BY_ID,
  GET_ORDERS_BY_USER,
  CREATE_ORDER,
  DELETE_ORDER,
  ORDERS_ERROR,
  UPDATE_ORDER_STATUS,
  CLEAR_SELECTED_ORDER
} from "./../actionTypes";

// Obtener todas las órdenes
export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders");
    dispatch({ type: GET_ORDERS, payload: res.data });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR, payload: error.message });
  }
};

// Obtener una orden por ID
export const getOrderById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/${id}`);
    dispatch({ type: GET_ORDER_BY_ID, payload: res.data });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR, payload: error.message });
  }
};

export const clearSelectedOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_SELECTED_ORDER });
};

// Obtener órdenes de un usuario
export const getOrdersByUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/user/${userId}`);
    dispatch({ type: GET_ORDERS_BY_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR, payload: error.message });
  }
};

export const createOrder = (orderData, token) => async (dispatch) => {
  try {
    const res = await axios.post("/api/orders", orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: CREATE_ORDER, payload: res.data });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR, payload: error.message });
  }
};

export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/orders/${id}/status?status=${status}`);
    dispatch({ type: UPDATE_ORDER_STATUS, payload: res.data });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR, payload: error.message });
  }
};

// Eliminar una orden
export const deleteOrder = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/orders/${id}`);
    dispatch({ type: DELETE_ORDER, payload: id });
  } catch (error) {
    dispatch({ type: ORDERS_ERROR, payload: error.message });
  }
};
