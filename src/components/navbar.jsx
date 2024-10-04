import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartcontext';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { email, logout } = useContext(UserContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🍕 Home</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {email ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">🔓 {email}</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={logout}>🔒 Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">🔐 Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">🔐 Register</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">🛒 Total: ${total.toLocaleString()}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
