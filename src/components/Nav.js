import React, { Component } from 'react';
import houseLogo from './../images/header_logo.png';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="center">
          <Link to="/" className="left">
            <img src={houseLogo} alt="HouseLogo" /> <p className="para"><span>Houser</span> Helper</p>
          </Link>
          <a className="right">
            Logout
          </a>
        </div>
      </div>
    );
  }
}

export default Nav;
