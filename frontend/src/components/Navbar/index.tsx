import "bootstrap/js/src/collapse.js";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getAccessTokenDecoded, isAllowebByRole, logout } from "src/utils/auth";
import "./styles.css";

const Navbar = () => {
  const [drawerActive, setDrawerActive] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const location = useLocation();

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    logout();
  };

  useEffect(() => {
    const currentUserData = getAccessTokenDecoded();
    setCurrentUser(currentUserData.user_name);
  }, [location]);

  return (
    <nav className="navbar-dark navbar navbar-expand-md bg-primary navbar-container">
      <div className="container-fluid">
        <Link to="/" className="navbar-logo">
          <img
            src="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/logo.png"
            alt="logo"
            className="navbar-logo-img"
          />
          <h4>DocAdmin</h4>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#docadmin-navbar"
          aria-controls="docadmin-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="docadmin-navbar">
          <ul className="navbar-nav offset-md-1 navbar-main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" activeClassName="active">
                MARKETING
              </NavLink>
            </li>
            <li>
              <NavLink to="dashboard" activeClassName="active">
                LABORATÓRIO
              </NavLink>
            </li>
            {isAllowebByRole(["ROLE_ADMIN"]) && (
              <li>
                <NavLink
                  onClick={() => setDrawerActive(false)}
                  to="/admin"
                  activeClassName="active"
                >
                  ADMIN
                </NavLink>
              </li>
            )}
            {drawerActive && (
              <li>
                {currentUser && (
                  <a
                    href="#logout"
                    className="navbar-link"
                    onClick={(e) => {
                      setDrawerActive(false);
                      handleLogout(e);
                    }}
                  >
                    {`LOGOUT - ${currentUser}`}
                  </a>
                )}
              </li>
            )}

            {drawerActive && (
              <>
                {!currentUser && (
                  <li>
                    <Link
                      onClick={() => setDrawerActive(false)}
                      to="/auth/login"
                      className="navbar-link active"
                    >
                      LOGIN
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="navbar-user-info">
          {currentUser && (
            <>
              <a
                href="logout"
                className="navbar-link active"
                onClick={(e) => {
                  setDrawerActive(false);
                  handleLogout(e);
                }}
              >
                LOGOUT
              </a>
              <div>
                <h6 className="nav-link-email">{currentUser}</h6>
              </div>
            </>
          )}
          {!currentUser && (
            <Link
              onClick={() => setDrawerActive(false)}
              className="navbar-link active"
              to="/auth/login"
            >
              LOGIN
            </Link>
          )}
        </div> 
      </div>
    </nav>
  );
};

export default Navbar;
