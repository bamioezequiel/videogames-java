import axios from 'axios';
import {
  GET_DETAIL_GAME,
  UPDATE_GAME,
  RESTORE_GAME,
  PATCH_FEATURED_GAME,
  PATCH_NEW_GAME,
  DELETE_GAME,
  POST_GAME,
  GET_GAMES,
  GET_ALL_GAMES,
  FILTERS_GAMES,
  ORDERS_GAMES,
  FILTER_SEARCH,
  AXIOS_ERROR,
  AXIOS_START,
} from '../actionTypes';

export const getAllGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/games');
    dispatch({ type: GET_ALL_GAMES, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const getGames = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/games?activeOnly=true');
    dispatch({ type: GET_GAMES, payload: res.data });
    
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const getDetailGame = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/games/${id}`);
    dispatch({ type: GET_DETAIL_GAME, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const createGame = (gameData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/games', gameData);
    dispatch({ type: POST_GAME, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const updateGame = (id, gameData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/games/${id}`, gameData);
    dispatch({ type: UPDATE_GAME, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const deleteGame = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/games/${id}`);
    dispatch({ type: DELETE_GAME, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const restoreGame = (id, value) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/games/status/${id}?value=${value}`);
    dispatch({ type: RESTORE_GAME, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const patchFeaturedGame = (id, value) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/games/featured/${id}?value=${value}`);
    dispatch({ type: PATCH_FEATURED_GAME, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const patchNewGame = (id, value) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/games/isNew/${id}?value=${value}`);
    dispatch({ type: PATCH_NEW_GAME, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const filterSearch = (value) => (dispatch) => {
  dispatch({ type: FILTER_SEARCH, payload: value });
};

export const ordersGames = (type, value) => (dispatch) => {
  dispatch({ type: ORDERS_GAMES, payload: { type, value } });
};

export const filtersGames = (type, value) => (dispatch) => {
  dispatch({ type: FILTERS_GAMES, payload: { type, value } });
};