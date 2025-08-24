import axios from 'axios';
import {
  GET_TAGS,
  GET_GENRES,
  GET_PLATFORMS,
  AXIOS_ERROR,
  AXIOS_START,
} from '../actionTypes';

export const getTags = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/categories/tags');
    dispatch({ type: GET_TAGS, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/categories/genres');
    dispatch({ type: GET_GENRES, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};

export const getPlatforms = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/categories/platforms');
    dispatch({ type: GET_PLATFORMS, payload: res.data });
  } catch (error) {
    dispatch({ type: AXIOS_ERROR, payload: error });
  }
};