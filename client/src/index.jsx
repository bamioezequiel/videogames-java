import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
);

