import React from "react";
import logo from "../images/logo.svg";
import { BiChevronDown } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav__logo">
          <img src={logo} alt="logo" className="nav__logo--logoimg" />
          <h4 className="nav__logo--text">Done</h4>
        </div>
        <ul className="nav__links">
          <li className="nav__link">
            <button className="btn btn--link">Why Us?</button>
          </li>
          <li className="nav__link">
            <button className="btn btn--link">
              Features <BiChevronDown className="chevronD-icon" />
            </button>
          </li>
          <li className="nav__link">
            <button className="btn btn--link">Pricing</button>
          </li>
          <li className="nav__link">
            <button className="btn btn--link">Contact</button>
          </li>
        </ul>
        <div className="cta-buttons">
          <button className="btn btn--login">Login</button>
          <button className="btn btn--signup">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
