import { NavLink } from 'react-router-dom';
import s from './AdminNav.module.css';
import { FaHome, FaPlusCircle, FaList, FaUsers, FaShoppingCart } from "react-icons/fa";

export default function AdminNav() {
  return (
    <nav className={s.dashboard_menu}>
      <NavLink to='/dashboard' end className={({ isActive }) => isActive ? s.active : ""}>
        <FaHome /> Home
      </NavLink>
      <NavLink to='/dashboard/create-game' className={({ isActive }) => isActive ? s.active : ""}>
        <FaPlusCircle /> Create Game
      </NavLink>
      <NavLink to='/dashboard/games' className={({ isActive }) => isActive ? s.active : ""}>
        <FaList /> List Games
      </NavLink>
      <NavLink to='/dashboard/users' className={({ isActive }) => isActive ? s.active : ""}>
        <FaUsers /> List Users
      </NavLink>
      <NavLink to='/dashboard/orders' className={({ isActive }) => isActive ? s.active : ""}>
        <FaShoppingCart /> List Orders
      </NavLink>
    </nav>
  );
}
