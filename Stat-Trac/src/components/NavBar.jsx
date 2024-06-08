import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/logout");
  };

  // Check if the current path includes "/new"
  const isNewPage = location.pathname.includes("/new");

  // Extract the character ID from the current path
  const characterId = location.pathname.split("/")[2];

  return (
    <nav className="bg-gray-800 text-white p-4 fixed bottom-0 w-full flex justify-between items-center">
      <div className="home-link">
        <Link to="/" className="hover:text-indigo-600">
          Home
        </Link>
      </div>
      <div className="nav-links">
        {isNewPage && (
          <button
            onClick={() => navigate(`/character/${characterId}`)}
            className="hover:text-indigo-600"
          >
            Back
          </button>
        )}
      </div>
      <div className="profile-section">
        {isAuthenticated ? (
          <>
            <span className="mr-4">Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="hover:text-indigo-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>
            <Link to="/signup" className="hover:text-indigo-600 ml-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;