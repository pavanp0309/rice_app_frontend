
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Menu ,Badge} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { AuthContext, useAuth } from "../../store/context/AuthContext";

const Navbar = () => {
const { user, logout } = useAuth();

  const navigate = useNavigate();

const handleMenuClick = ({ key }) => {
  if (key === 'logout') {
    logout(); // <-- this now properly clears storage + redirects
  } else {
    navigate(`/${key}`);
  }
};


  const dropdownMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="orders" icon={<OrderedListOutlined />}>
        Orders
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const handleCartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg shadow bg-dark navbar-dark px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/assets/rice.png" alt="logo" height="40" className="me-2" />
          <h4 className="m-0 text-light fw-bold">
            Rice<span className="text-warning">Mart</span>
          </h4>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/home"></Link>

        <div className="collapse navbar-collapse" id="navbarMenu">
          {/* Center nav links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {['Home', 'About', 'Shop', 'Contact'].map((item) => (
              <li className="nav-item" key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="nav-link fw-bold fs-5 text-light"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>


            {/* Cart Icon */}
<Badge count={0} offset={[0, 0]} size="small" color='white'>
  <span
    className="text-light fs-4 me-3"
    style={{ cursor: 'pointer' }}
    onClick={handleCartClick}
    title={user ? 'View Cart' : 'Login to View Cart'}
  >
    <ShoppingCartOutlined />
  </span>
</Badge>

          {/* Right side actions */}
          <div className="d-flex align-items-center">
            {/* Dealer CTA */}
            <Link to="/dealer-register" className="btn btn-warning me-3">
              Become a Dealer
            </Link>


            {/* User Section */}
            {user ? (
              <Dropdown overlay={dropdownMenu} placement="bottomRight" trigger={['click']}>
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: 'green', cursor: 'pointer' }}
                />
              </Dropdown>
            ) : (
              <Link to="/auth" className="btn btn-outline-light">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
