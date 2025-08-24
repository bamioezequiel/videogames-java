import axios from 'axios';
import {
  GET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  AXIOS_ERROR,
  AXIOS_START
} from '../actionTypes';

export const getFavorites = () => async (dispatch) => {
  try {
    dispatch({ type: AXIOS_START });
    const res = await axios.get('/api/favorites');
    dispatch({ type: GET_FAVORITES, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const addFavorite = (gameId) => async (dispatch) => {
  try {
    dispatch({ type: AXIOS_START });
    await axios.post(`/api/favorites/${gameId}`);
    dispatch(getFavorites());
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const removeFavorite = (gameId) => async (dispatch) => {
  try {
    dispatch({ type: AXIOS_START });
    await axios.delete(`/api/favorites/${gameId}`);
    dispatch(getFavorites());
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};
