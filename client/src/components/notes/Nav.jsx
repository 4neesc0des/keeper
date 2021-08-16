import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ setIsLogin }) => {
  const logoutControl = (e) => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">KEEPER</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create Note</Link>
        </li>
        <li onClick={logoutControl}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
