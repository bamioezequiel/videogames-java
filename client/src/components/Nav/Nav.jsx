import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineLogin, AiOutlineAppstoreAdd, AiOutlineInfoCircle, AiOutlinePhone } from "react-icons/ai";
import { MdGames } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import s from "./Nav.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { useCartContext } from "../../context/CartContext"; // ejemplo

export default function Nav() {
  const { user, isAuth } = useAuthContext();
  const { cart } = useCartContext(); // ✅ ahora lo sacamos del contexto

  const favoritesDB = useSelector((state) => state.favorites) || [];
  const favoritesLS = useSelector((state) => state.favoritesLS) || [];

  const cartLS = useSelector((state) => state.cartLS) || [];

  const cartCount = isAuth ? cart.length : cartLS.length;
  const favoritesCount = isAuth ? favoritesDB.length : favoritesLS.length;

  const menuCol1 = [
    { to: "/", title: "Inicio", icon: <AiFillHome /> },
    {
      to: "/cart",
      title: `Cart (${cartCount} ${cartCount === 1 ? "game" : "games"})`,
      icon: <BsFillCartCheckFill />,
      badge: cartCount,
    },
    { to: "/about", title: "Acerca de", icon: <AiOutlineInfoCircle /> },
  ];

  const menuCol2 = [
    
    { to: "/store", title: "Store", icon: <AiOutlineAppstoreAdd /> },   
  ];

  const renderMenuItems = (items) =>
    items.map(({ to, title, icon, badge }, idx) => (
      <NavLink key={idx} to={to} title={title} className={s.nav_menu_item}>
        {icon}
        {badge > 0 && <span className={s.item_amount}>{badge}</span>}
      </NavLink>
    ));

  return (
    <div className={s.nav_container}>
      <nav className={s.nav}>
        <div className={s.nav_menu}>
          <div className={s.nav_menu_col1}>{renderMenuItems(menuCol1)}</div>
          <div className={s.nav_menu_col2}>{renderMenuItems(menuCol2)}</div>
          <div className={s.nav_menu_col3}>
            {isAuth ? (
              <NavLink to="/profile" title="Profile" className={s.nav_menu_item}>
                <img
                  src={user?.picture || "/default-avatar.png"}
                  className={s.nav_menu_image_profile}
                  alt="Profile"
                />
              </NavLink>
            ) : (
              <NavLink to="/login" title="Login" className={s.nav_menu_item}>
                <AiOutlineLogin />
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
