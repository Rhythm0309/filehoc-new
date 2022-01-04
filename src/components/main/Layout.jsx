import React from "react";
import { Outlet } from "react-router-dom";
import homeImage from "../../assets/home-art.png";
function Layout(props) {
  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-5 vh-100 d-flex flex-column justify-content-center primary-bg text-center">
          <div className="mb-3 text-white">
            <h1 className="display-5">
              FileHoc <span className="fs-4 fw-bold">Datatransfer</span>
            </h1>
            <h3 className="fw-bold fs-2">simple-fast-securely</h3>
            <p className="fs-3 fw-bold">
              Send without registration, with a free or a premium account!
            </p>
          </div>
          <img className="img-fluid" src={homeImage} alt="main" />
        </div>
        <div className="col-lg-3 d-flex flex-column align-items-center">
          <h1 className="display-6 fw-normal">The easy <br/> way to send <br/>big files</h1>
          <ul className="list-unstyled fs-5 mt-4">
          <li><i className="bi-check me-2"></i>It’s free</li>
          <li><i className="bi-check me-2"></i>Send up to 2GB</li>
          <li><i className="bi-check me-2"></i>No registration</li>
          <li><i className="bi-check me-2"></i>Simple and secure</li>
          </ul>
        </div>
        <div className="col-lg-4 pe-5">
        <div className="card shadow p-3">       
            <Outlet />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
