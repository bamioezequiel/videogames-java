import axios from 'axios';
import {
  GET_CART,
  PUT_CART,
  DELETE_CART,
  GET_ALL_CART,
  GET_ALL_ORDERS,
  AXIOS_ERROR,
  AXIOS_START,
} from '../actionTypes';

// Obtener carrito de un usuario
export const getCart = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cart/${userId}`);
    dispatch({ type: GET_CART, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

// Agregar un juego al carrito
export const addToCart = (userId, gameId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/cart/${userId}/add?gameId=${gameId}`);
      console.log( res.data)

    dispatch({ type: PUT_CART, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

// Eliminar un juego del carrito
export const removeCart = (userId, gameId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/cart/${userId}/remove?gameId=${gameId}`);
    dispatch({ type: DELETE_CART, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

// Vaciar todo el carrito
export const cleanAllGames = (userId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/cart/${userId}/clean`);
    dispatch({ type: DELETE_CART, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

// Cambiar el estado del carrito (ej: "approved", "cancelled")
export const updateCartStatus = (userId, status) => async (dispatch) => {
  try {
    await axios.put(`/api/cart/${userId}/status?status=${status}`);
    dispatch(getCart(userId));
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

// Obtener todas las órdenes (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cart/all`);
    dispatch({ type: GET_ALL_ORDERS, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

// Obtener historial de carritos de un usuario
export const getAllCartHistory = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cart/user/${userId}/history`);
    dispatch({ type: GET_ALL_CART, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};
