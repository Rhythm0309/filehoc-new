import React from "react";
import { Link, Outlet } from "react-router-dom";

function Dashboard(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex flex-column vh-100 flex-shrink-0 col-1 bg-dark">          
          <ul className="nav nav-pills nav-flush flex-column mb-auto mt-4 pt-5 text-center">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link active py-3 border-bottom"
                aria-current="page"
                title="Dashboard"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Home"
              >
                <i className="bi bi-house-fill"></i>
              </Link>
            </li>
            <li>
              <Link
                to="user-list"
                className="nav-link py-3 border-bottom"
                title="User List"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Dashboard"
              >
                <i className="bi bi-person-circle"></i>
              </Link>
            </li>            
          </ul>
          <div className="dropdown border-top">
            <a
              href="/"
              className="pe-none d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="24"
                height="24"
                className="rounded-circle"
              />
            </a>
            <ul
              className="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser3"
            >
              
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-11 pt-5">
        <Outlet />
        </div>
      </div>     
    </div>
  );
}

export default Dashboard;
