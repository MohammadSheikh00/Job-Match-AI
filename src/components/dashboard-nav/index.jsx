import React from "react";
import { NavLink } from "react-router";
import "./style.css";

const DashboardNav = ({ links }) => {
  return (
    <nav className="dashboard-nav">
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <div className="links-wrapper">
        {links.map((link) => {
          return (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <link.icon />
              <span>{link.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default DashboardNav;
