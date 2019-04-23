import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const NavBar = ({ heading, pages }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      {heading ? (
        <NavLink className="navbar-brand" to="/">
          {heading}
        </NavLink>
      ) : (
        ""
      )}
      <ul className="navbar-nav mr-auto">
        {pages.map(page => (
          <li key={page.caption} className="nav-item">
            <NavLink className="nav-link" to={page.path}>
              {page.caption}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  heading: PropTypes.string,
  links: PropTypes.array
};

export default NavBar;
