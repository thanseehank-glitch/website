import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import {
  LayoutGrid,
  Users,
  ShoppingBag,
  Package,
  LogOut,
} from 'lucide-react';
import "./css/Layout.css"
function AdminLayout() {
  const { logout } = useAuth();


  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    logout();
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">Z</div>
          <h1 className="brand-name">ZIVORA</h1>
        </div>

        <div className="sidebar-nav">
          <NavLink to="/adminpanel/dashboard" className="nav-link">
            <LayoutGrid size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/adminpanel/users" className="nav-link">
            <Users size={20} />
            <span>Users</span>
          </NavLink>

          <NavLink to="/adminpanel/orders" className="nav-link">
            <ShoppingBag size={20} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/adminpanel/products" className="nav-link">
            <Package size={20} />
            <span>Products</span>
          </NavLink>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className='admin-content'>
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;