import React from "react";
import SideNav from "./SideNav.css";
import cosmosLogo from "../assets/images/cosmosLogo.png";

const sideNav = props => {
  return (
    <div className="container-fluid">
      <div className="row-fluid">
        <div className="col-sm-3 col-md-2 sidebar">
          <img src={cosmosLogo} className="cosmos-logo" />
          <ul className="nav nav-sidebar side-items">
            <li className="side-item">
              <span className="side-name">Atom % of Network </span>
            </li>
            <li className="side-item">
              <span className="side-name">Delegate Commission</span>
            </li>
            <li className="side-item">
              <span className="side-name">Atoms Delegated</span>
            </li>
            <li className="side-item">
              <span className="side-name">Atoms Self-Bonded</span>
            </li>
            <li className="side-item">
              <span className="side-name">ChoiceA</span>
            </li>
            <li className="side-item">
              <span className="side-name">ChoiceA</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default sideNav;
