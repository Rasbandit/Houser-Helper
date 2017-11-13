import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import houseLogo from './../images/header_logo.png';

class Nav extends Component {
  async logout() {
    await axios.delete('/logout');
  }

  render() {
    return (
      <div className="nav">
        <div className="content">
          <Link to="/dashboard" className="left">
            <img src={houseLogo} alt="HouseLogo" /> <p className="para"><span>Houser</span> Helper</p>
          </Link>
          {
            this.props.favoriteHouses.length ?
              (<Link to="/favorites" className="center">
              Favorites
              </Link>) :
              ''
          }
          {
            this.props.listed.length ?
              (<Link to="/listed" className="center">
                Your Listings
              </Link>) :
              ''
          }
          <Link to="/" onClick={() => { this.logout(); }} className="right">
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listed: state.listedHouses,
    favoriteHouses: state.favoriteHouses
  };
}

export default connect(mapStateToProps)(Nav);
