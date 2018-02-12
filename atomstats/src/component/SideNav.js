import React from "react";
import SideNav from './SideNav.css';
import cosmosLogo from '../assets/images/cosmosLogo.png';

const sideNav = props => {
  return (
    <div class="container-fluid">
      <div class="row-fluid">
        <div class="col-sm-3 col-md-2 sidebar">
          <img src={cosmosLogo} className="cosmos-logo"  />
          <ul class="nav nav-sidebar">
            <li>
              <a href="#" class="Active">
                ChoiceA
              </a>
            </li>
            <li>
              <a href="#">ChoiceB</a>
            </li>
            <li>
              <a href="#" class="Active">
                ChoiceA
              </a>
            </li>
            <li>
              <a href="#">ChoiceB</a>
            </li>
            <li>
              <a href="#" class="Active">
                ChoiceA
              </a>
            </li>
            <li>
              <a href="#">ChoiceB</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default sideNav;
