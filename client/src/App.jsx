import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import {
  getAllGames,
  getGames,
} from "./redux/actions/gameActions";
import {
  getGenres,
  getPlatforms,
  getTags,
} from "./redux/actions/categoriesActions";
import { getCart } from "./redux/actions/cartActions";

import { useAuthContext } from "./context/AuthContext"; 
import useLoading from "./components/Loading/Loading";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail/Detail";
import Store from "./components/Store/Store";
import Login from "./components/Login/Login";
import Signup from "./components/Singup/Signup";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";
import Dashboard from "./components/Dashboard/Dashboard";
import ListUsers from "./components/Dashboard/ListUsers/ListUsers";
import ListGames from "./components/Dashboard/ListGames/ListGames";
import CreateGame from "./components/Dashboard/CreateGame/CreateGame";
import ListOrders from "./components/Dashboard/ListOrders/ListOrders";
import About from "./components/About/About";
import FakePaymentForm from "./components/FakePaymentForm/FakePaymentForm";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import NotFound from "./components/NotFound/NotFound";
import ChangePassword from "./components/ChangePassword/ChangePassword";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const dispatch = useDispatch();
  const { loading, setLoading, Loading } = useLoading();
  const { isAuth, isAdmin, user, initialized } = useAuthContext();

  useEffect(() => {
    if (!initialized) return; // Espera a que termine de inicializar el contexto

    const fetchData = async () => {
      try {
        setLoading(true);

        // Cargar datos generales
        await Promise.all([
          dispatch(getGames()),
          dispatch(getGenres()),
          dispatch(getPlatforms()),
          dispatch(getTags()),
        ]);

        // Cargar carrito solo si hay usuario logueado
        if (isAuth && user?._id) {
          await dispatch(getCart(user._id));
        }

      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        Swal.fire("Error", "No se pudieron cargar los datos iniciales", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, isAuth, user, setLoading, initialized]);

  // Mientras inicializa el AuthContext mostramos loading
  if (!initialized) {
    return <Loading />;
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="container-app">
      <BrowserRouter>
        <Nav />
        <main className="content-app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/payment" element={<FakePaymentForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgot-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />

            <Route
              path="/login"
              element={!isAuth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isAuth ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isAuth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders/:id"
              element={isAuth ? <OrderDetail /> : <Navigate to="/login" />}
            />

            <Route
              path="/dashboard"
              element={isAdmin ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/users"
              element={isAdmin ? <ListUsers /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/users/:id"
              element={isAdmin ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/orders"
              element={isAdmin ? <ListOrders /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/games"
              element={isAdmin ? <ListGames /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/create-game"
              element={isAdmin ? <CreateGame /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/update-game/:id"
              element={isAdmin ? <CreateGame /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
