// import logo from '../../assets/logo.svg';
import React, { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../UserContext";

function Navigation(props) {
  const currentContext = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentContext.userState.isLoggedIn) {
      localStorage.setItem(
        "userState",
        JSON.stringify(currentContext.userState)
      );
    }
  }, [currentContext.userState]);

  let localData = JSON.parse(localStorage.getItem("userState"));

  const logout = () => {
    localStorage.removeItem("userState");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          {/* <img className='logo' src={logo} alt='logo' /> */}
          FileHoc
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="terms">
                Terms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="signin">
                Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="signup">
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        {localData ? (
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {localData.currentUserName}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li className="dropdown-item">
            <NavLink className="nav-link" to="dashboard">
                My Files
              </NavLink>
              </li>
              <li className="dropdown-item">
                My Profile
              </li>
              <li className="dropdown-item" onClick={logout}>
                Logout
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

export default Navigation;
