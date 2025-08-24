import {
  // Game Types
  GET_GAMES,
  GET_ALL_GAMES,
  GET_DETAIL_GAME,
  POST_GAME,
  UPDATE_GAME,
  DELETE_GAME,
  RESTORE_GAME,
  PATCH_FEATURED_GAME,
  PATCH_NEW_GAME,
  FILTER_SEARCH,
  FILTERS_GAMES,
  ORDERS_GAMES,
  // Cart Types
  GET_CART,
  PUT_CART,
  DELETE_CART,
  GET_ALL_CART,
  GET_ALL_ORDERS,
  // Category Types
  GET_TAGS,
  GET_GENRES,
  GET_PLATFORMS,
  // User Types
  GET_USER,
  GET_ALL_USER,
  AUTHENTICATE_STATUS,
  LOGOUT_USER,
  LOGIN_USER,
  UPDATE_USER,
  CREATE_USER,
  GET_USER_BY_TOKEN,
  GET_ALL_USERS,
  GET_ORDERS,
  GET_ORDER_BY_ID,
  GET_ORDERS_BY_USER,
  CREATE_ORDER,
  DELETE_ORDER,
  ORDERS_ERROR,
  CLEAR_SELECTED_ORDER
} from "../actionTypes";

import { filterGames, orderings, search } from "../../utils/filtersAndOrders";

const initialState = {
  allUsers: [],
  userDetail: null,
  user: null, 
  token: localStorage.getItem("token") || null,
  isAuth: false,
  isAdmin: false,
  tags: [],
  genres: [],
  platforms: [],
  loading: false,
  error: null,
  cart: {},
  carts: [],
  allGames: [],
  games: [],
  filteredGames: [],
  detailGame: {},
  filterGenres: { value: "" },
  filterTags: { value: "" },
  filterPlatforms: { value: "" },
  orders: [],
  selectedOrder: null,
  userOrders: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.payload, error: null };
    case GET_ORDER_BY_ID:
      return { ...state, selectedOrder: action.payload, error: null };
    case GET_ORDERS_BY_USER:
      return { ...state, userOrders: action.payload, error: null };
      case CLEAR_SELECTED_ORDER:
      return { ...state, selectedOrder: null };
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action.payload], error: null };
    case DELETE_ORDER:
      return { ...state, orders: state.orders.filter(order => order.id !== action.payload), error: null };
    // ---------- AUTH ----------
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user || null,
        isAuth: true,
        isAdmin: action.payload.user?.role === "admin",
        loading: false,
        error: null,
      };

    case GET_USER_BY_TOKEN:
    case AUTHENTICATE_STATUS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isAdmin: action.payload?.role === "admin",
        loading: false,
        error: null,
      };

    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        isAdmin: false,
        cart: {},
        loading: false,
        error: null,
      };

    // ---------- GAMES ----------
    case GET_ALL_GAMES:
      return { ...state, allGames: action.payload, loading: false };
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        filteredGames: action.payload,
        loading: false,
      };
    case GET_DETAIL_GAME:
      return { ...state, detailGame: action.payload, loading: false };
    case POST_GAME:
    case UPDATE_GAME:
    case DELETE_GAME:
    case RESTORE_GAME:
    case PATCH_FEATURED_GAME:
    case PATCH_NEW_GAME:
      return { ...state, allGames: action.payload, loading: false };
    case FILTER_SEARCH:
      return { ...state, filteredGames: search(state.games, action.payload) };
    case FILTERS_GAMES:
      const { type, value } = action.payload;
      const filtered = filterGames(state.allGames, type, value);
      return {
        ...state,
        filteredGames: filtered,
        [`filter${type.charAt(0).toUpperCase() + type.slice(1)}`]: { value },
      };
    case ORDERS_GAMES:
      return {
        ...state,
        filteredGames: orderings(
          state.filteredGames,
          action.payload.type,
          action.payload.value
        ),
        orders: action.payload,
      };

    // ---------- CART ----------
    case GET_CART:
    case PUT_CART:
    case DELETE_CART:
      return { ...state, cart: action.payload, loading: false };
    case GET_ALL_CART:
      return { ...state, carts: action.payload, loading: false };
    case GET_ALL_ORDERS:
      return { ...state, orders: action.payload, loading: false };

    // ---------- CATEGORIES ----------
    case GET_TAGS:
      return { ...state, tags: action.payload, loading: false };
    case GET_GENRES:
      return { ...state, genres: action.payload, loading: false };
    case GET_PLATFORMS:
      return { ...state, platforms: action.payload, loading: false };

    // ---------- USERS ----------
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload, loading: false, error: null };
    case GET_USER:
      return { ...state, userDetail: action.payload, loading: false, error: null };
    case UPDATE_USER:
      return {
        ...state,
        userDetail: action.payload,
        allUsers: state.allUsers.map((u) =>
          u._id === action.payload._id ? action.payload : u
        ),
        loading: false,
        error: null,
      };
    case CREATE_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default rootReducer;
