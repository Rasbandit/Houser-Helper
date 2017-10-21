import React, { Component } from 'react';
import houseLogo from './../images/header_logo.png';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="content">
          <Link to="/dashboard" className="left">
            <img src={houseLogo} alt="HouseLogo" /> <p className="para"><span>Houser</span> Helper</p>
          </Link>
          <Link to="/favorites" className="center">
            Favorites
          </Link>
          <Link to="/" className="right">
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
